const path = require('path');
const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

const server = http.createServer(handleRequest);
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, 'public');
const sockets = new Set();
const DEFAULT_USER = {
  id: 'parent-001',
  name: '王晨曦',
  avatar: 'https://placehold.co/96x96/F4F8FF/165DFF?text=%E5%AE%B6%E9%95%BF',
  mobile: '138****2698'
};

const DB_FILES = {
  articles: 'articles.json',
  doctors: 'doctors.json',
  hospitals: 'hospitals.json',
  scales: 'scales.json',
  schedules: 'schedules.json',
  appointments: 'appointments.json',
  patients: 'patients.json',
  assessments: 'assessments.json',
  favorites: 'favorites.json',
  reviews: 'reviews.json',
  activities: 'activities.json'
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function nowIso() {
  return new Date().toISOString();
}

function uuidv4() {
  return crypto.randomUUID();
}

function response(data, message = 'success') {
  return {
    code: 200,
    message,
    data,
    timestamp: nowIso()
  };
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function ensureDataFiles() {
  ensureDataDir();
  Object.values(DB_FILES).forEach((file) => {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf8');
    }
  });
}

function filePathFor(key) {
  return path.join(DATA_DIR, DB_FILES[key]);
}

function readData(key) {
  ensureDataFiles();
  return JSON.parse(fs.readFileSync(filePathFor(key), 'utf8'));
}

function writeData(key, data) {
  ensureDataFiles();
  fs.writeFileSync(filePathFor(key), JSON.stringify(data, null, 2), 'utf8');
}

function getAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthGap = now.getMonth() - birth.getMonth();
  if (monthGap < 0 || (monthGap === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

function getAgeBand(age) {
  if (age <= 3) return '0-3岁';
  if (age <= 6) return '3-6岁';
  if (age <= 12) return '6-12岁';
  return '12-18岁';
}

function toDateTime(date, timeSlot) {
  const timePart = String(timeSlot || '').split('-')[0] || '09:00';
  return new Date(`${date}T${timePart}:00`);
}

function canCancel(appointment) {
  const appointmentTime = toDateTime(appointment.date, appointment.timeSlot);
  return appointmentTime.getTime() - Date.now() >= 24 * 60 * 60 * 1000;
}

function withinSevenDays(dateA, dateB) {
  const a = new Date(dateA).getTime();
  const b = new Date(dateB).getTime();
  return Math.abs(a - b) <= 6 * 24 * 60 * 60 * 1000;
}

function broadcast(type, data) {
  const payload = JSON.stringify({ type, data, timestamp: nowIso() });
  sockets.forEach((socket) => {
    try {
      sendSocket(socket, payload);
    } catch (error) {
      sockets.delete(socket);
      socket.destroy();
    }
  });
}

function addActivity(action, title, detail) {
  const activities = readData('activities');
  const activity = {
    id: uuidv4(),
    action,
    title,
    detail,
    createdAt: nowIso()
  };
  activities.unshift(activity);
  writeData('activities', activities.slice(0, 100));
  broadcast('activity:new', activity);
  return activity;
}

function withHospital(doctor, hospitals) {
  return {
    ...doctor,
    hospital: hospitals.find((item) => item.id === doctor.hospitalId) || null
  };
}

function enrichArticles(articles, favorites) {
  return articles.map((article) => {
    const articleFavorites = favorites.filter((item) => item.articleId === article.id);
    return {
      ...article,
      favoriteCount: articleFavorites.length,
      isFavorite: articleFavorites.some((item) => item.userId === DEFAULT_USER.id)
    };
  });
}

function enrichAppointments(appointments, doctors, hospitals, patients) {
  return appointments.map((appointment) => {
    const doctor = doctors.find((item) => item.id === appointment.doctorId);
    const patient = patients.find((item) => item.id === appointment.patientId);
    return {
      ...appointment,
      doctor: doctor ? withHospital(doctor, hospitals) : null,
      patient: patient ? { ...patient, age: getAge(patient.birthDate) } : null,
      canCancel: appointment.status === '待就诊' ? canCancel(appointment) : false
    };
  });
}

function getDashboardSnapshot() {
  const articles = readData('articles');
  const appointments = readData('appointments');
  const assessments = readData('assessments');
  const activities = readData('activities');
  const schedules = readData('schedules');
  const today = new Date().toISOString().slice(0, 10);
  const cards = {
    todayVisits: activities.filter((item) => item.createdAt.startsWith(today)).length + 86,
    articleReads: articles.reduce((sum, item) => sum + (item.views || 0), 0),
    assessmentCount: assessments.length,
    appointmentCount: appointments.filter((item) => item.status !== '已取消').length
  };

  const trends = Array.from({ length: 7 }).map((_, index) => {
    const pointDate = new Date();
    pointDate.setDate(pointDate.getDate() - (6 - index));
    const date = pointDate.toISOString().slice(0, 10);
    return {
      date,
      appointments: appointments.filter((item) => item.createdAt.startsWith(date)).length,
      assessments: assessments.filter((item) => item.createdAt.startsWith(date)).length
    };
  });

  const lowSlotCount = schedules.filter((item) => item.availableSlots <= 3 && item.availableSlots > 0).length;
  const todoItems = [
    { id: 'todo-1', label: `待发布科普内容 ${articles.filter((item) => item.status !== '已发布').length} 条`, level: 'warning' },
    { id: 'todo-2', label: `低余量号源 ${lowSlotCount} 个`, level: lowSlotCount ? 'danger' : 'success' },
    { id: 'todo-3', label: `高风险测评 ${assessments.filter((item) => item.riskLevel === '高').length} 条`, level: 'danger' }
  ];

  return {
    cards,
    trends,
    activityFeed: activities.slice(0, 20),
    todos: todoItems
  };
}

function getAssessmentAnalytics() {
  const assessments = readData('assessments');
  const scales = readData('scales');
  const byScale = scales.map((scale) => {
    const matched = assessments.filter((item) => item.scaleId === scale.id);
    return {
      scaleId: scale.id,
      scaleName: scale.name,
      total: matched.length,
      high: matched.filter((item) => item.riskLevel === '高').length,
      medium: matched.filter((item) => item.riskLevel === '中').length,
      low: matched.filter((item) => item.riskLevel === '低').length
    };
  });

  const trends = Array.from({ length: 14 }).map((_, index) => {
    const pointDate = new Date();
    pointDate.setDate(pointDate.getDate() - (13 - index));
    const date = pointDate.toISOString().slice(0, 10);
    return {
      date,
      total: assessments.filter((item) => item.createdAt.startsWith(date)).length,
      high: assessments.filter((item) => item.createdAt.startsWith(date) && item.riskLevel === '高').length
    };
  });

  return {
    overview: {
      total: assessments.length,
      high: assessments.filter((item) => item.riskLevel === '高').length,
      medium: assessments.filter((item) => item.riskLevel === '中').length,
      low: assessments.filter((item) => item.riskLevel === '低').length
    },
    byScale,
    trends,
    highRiskList: assessments.filter((item) => item.riskLevel === '高')
  };
}

function buildBootstrap(scope = 'mobile') {
  const articles = readData('articles');
  const favorites = readData('favorites');
  const hospitals = readData('hospitals');
  const doctorsRaw = readData('doctors');
  const doctors = doctorsRaw.map((doctor) => withHospital(doctor, hospitals));
  const schedules = readData('schedules').map((s) => {
    const doc = doctorsRaw.find((d) => d.id === s.doctorId);
    return { ...s, doctorName: doc ? doc.name : s.doctorId };
  });
  const appointments = enrichAppointments(readData('appointments'), readData('doctors'), hospitals, readData('patients'));
  const patients = readData('patients').map((item) => ({ ...item, age: getAge(item.birthDate), ageBand: getAgeBand(getAge(item.birthDate)) }));
  const assessments = readData('assessments');
  const reviews = readData('reviews');
  const scales = readData('scales').map((item) => ({
    ...item,
    questionCount: item.questions.length
  }));
  const enrichedArticles = enrichArticles(articles, favorites);

  return {
    user: DEFAULT_USER,
    scope,
    articles: scope === 'admin' ? enrichedArticles : enrichedArticles.filter((item) => item.status === '已发布'),
    doctors,
    hospitals,
    scales,
    schedules,
    patients,
    appointments,
    assessments,
    favorites,
    reviews,
    dashboard: getDashboardSnapshot(),
    assessmentAnalytics: getAssessmentAnalytics(),
    categories: ['情绪', '学习', '亲子', '发育', '睡眠']
  };
}

function refreshPayload(scope) {
  return buildBootstrap(scope);
}

function setCommonHeaders(res, contentType = 'application/json; charset=utf-8') {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', contentType);
}

function sendJson(res, statusCode, payload) {
  setCommonHeaders(res);
  res.writeHead(statusCode);
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, text, contentType = 'text/plain; charset=utf-8') {
  setCommonHeaders(res, contentType);
  res.writeHead(statusCode);
  res.end(text);
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk.toString();
      if (raw.length > 2 * 1024 * 1024) {
        reject(new Error('请求体过大'));
      }
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('无效的 JSON 请求体'));
      }
    });
    req.on('error', reject);
  });
}

function matchRoute(pathname, pattern) {
  const matched = pathname.match(pattern);
  return matched || null;
}

async function handleApi(req, res, url) {
  const pathname = url.pathname;
  const method = req.method;
  let body = {};

  if (method === 'OPTIONS') {
    sendText(res, 204, '');
    return;
  }

  try {
    if (method !== 'GET') {
      body = await parseBody(req);
    }

    if (method === 'GET' && pathname === '/api/health') {
      sendJson(res, 200, response({ status: 'running' }, 'ok'));
      return;
    }

    if (method === 'GET' && pathname === '/api/bootstrap') {
      const scope = url.searchParams.get('scope') === 'admin' ? 'admin' : 'mobile';
      sendJson(res, 200, response(refreshPayload(scope)));
      return;
    }

    if (method === 'GET' && pathname === '/api/articles') {
      const category = url.searchParams.get('category');
      const contentType = url.searchParams.get('contentType');
      const articles = enrichArticles(readData('articles'), readData('favorites')).filter((item) => item.status === '已发布');
      const filtered = articles.filter((article) => {
        const categoryOk = !category || category === '全部' || article.category === category;
        const typeOk = !contentType || contentType === '全部' || article.contentType === contentType;
        return categoryOk && typeOk;
      });
      sendJson(res, 200, response(filtered));
      return;
    }

    const articleDetailMatch = matchRoute(pathname, /^\/api\/articles\/([^/]+)$/);
    if (method === 'GET' && articleDetailMatch) {
      const articleId = articleDetailMatch[1];
      const articles = enrichArticles(readData('articles'), readData('favorites'));
      const article = articles.find((item) => item.id === articleId);
      if (!article) {
        sendJson(res, 404, { code: 404, message: '内容不存在' });
        return;
      }
      const doctors = readData('doctors');
      const hospitals = readData('hospitals');
      const recommendedDoctors = doctors
        .filter((item) => item.specialties.some((entry) => entry.includes(article.category)))
        .slice(0, 3)
        .map((item) => withHospital(item, hospitals));
      sendJson(res, 200, response({ ...article, recommendedDoctors }));
      return;
    }

    if (method === 'GET' && pathname === '/api/doctors') {
      const hospitals = readData('hospitals');
      sendJson(res, 200, response(readData('doctors').map((item) => withHospital(item, hospitals))));
      return;
    }

    const doctorAvailabilityMatch = matchRoute(pathname, /^\/api\/doctors\/([^/]+)\/availability$/);
    if (method === 'GET' && doctorAvailabilityMatch) {
      const doctorId = doctorAvailabilityMatch[1];
      const schedules = readData('schedules').filter((item) => item.doctorId === doctorId).sort((a, b) => `${a.date}${a.timeSlot}`.localeCompare(`${b.date}${b.timeSlot}`)).slice(0, 21);
      sendJson(res, 200, response(schedules));
      return;
    }

    const doctorDetailMatch = matchRoute(pathname, /^\/api\/doctors\/([^/]+)$/);
    if (method === 'GET' && doctorDetailMatch) {
      const doctorId = doctorDetailMatch[1];
      const hospitals = readData('hospitals');
      const doctor = readData('doctors').find((item) => item.id === doctorId);
      if (!doctor) {
        sendJson(res, 404, { code: 404, message: '医生不存在' });
        return;
      }
      const schedules = readData('schedules').filter((item) => item.doctorId === doctor.id);
      sendJson(res, 200, response({ ...withHospital(doctor, hospitals), schedules }));
      return;
    }

    if (method === 'GET' && pathname === '/api/patients') {
      const patients = readData('patients').map((item) => ({ ...item, age: getAge(item.birthDate), ageBand: getAgeBand(getAge(item.birthDate)) }));
      sendJson(res, 200, response(patients));
      return;
    }

    if (method === 'POST' && pathname === '/api/patients') {
      const patients = readData('patients');
      if (patients.length >= 5) {
        sendJson(res, 400, { code: 400, message: '最多添加5个就诊人' });
        return;
      }
      if (!body.name || !body.birthDate || !body.idCard || !body.emergencyContact) {
        sendJson(res, 400, { code: 400, message: '请完整填写儿童信息' });
        return;
      }
      const patient = { id: uuidv4(), userId: DEFAULT_USER.id, createdAt: nowIso(), ...body };
      patients.push(patient);
      writeData('patients', patients);
      addActivity('patient_created', '新增儿童就诊人', `${patient.name} 已加入就诊人列表`);
      sendJson(res, 200, response(patient, '创建成功'));
      return;
    }

    const patientMatch = matchRoute(pathname, /^\/api\/patients\/([^/]+)$/);
    if (patientMatch && method === 'PUT') {
      const patients = readData('patients');
      const index = patients.findIndex((item) => item.id === patientMatch[1]);
      if (index === -1) {
        sendJson(res, 404, { code: 404, message: '就诊人不存在' });
        return;
      }
      patients[index] = { ...patients[index], ...body, updatedAt: nowIso() };
      writeData('patients', patients);
      sendJson(res, 200, response(patients[index], '更新成功'));
      return;
    }

    if (patientMatch && method === 'DELETE') {
      writeData('patients', readData('patients').filter((item) => item.id !== patientMatch[1]));
      sendJson(res, 200, response(true, '删除成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/scales') {
      const ageBand = url.searchParams.get('ageBand');
      const problemType = url.searchParams.get('problemType');
      const scales = readData('scales').filter((item) => {
        const ageOk = !ageBand || ageBand === '全部' || item.ageBand === ageBand;
        const typeOk = !problemType || problemType === '全部' || item.problemType === problemType;
        return ageOk && typeOk;
      }).map((item) => ({ ...item, questionCount: item.questions.length }));
      sendJson(res, 200, response(scales));
      return;
    }

    const scaleMatch = matchRoute(pathname, /^\/api\/scales\/([^/]+)$/);
    if (method === 'GET' && scaleMatch) {
      const scale = readData('scales').find((item) => item.id === scaleMatch[1]);
      if (!scale) {
        sendJson(res, 404, { code: 404, message: '量表不存在' });
        return;
      }
      sendJson(res, 200, response(scale));
      return;
    }

    if (method === 'POST' && pathname === '/api/assessments/submit') {
      const scales = readData('scales');
      const patients = readData('patients');
      const assessments = readData('assessments');
      const scale = scales.find((item) => item.id === body.scaleId);
      const patient = patients.find((item) => item.id === body.patientId);
      if (!scale || !patient) {
        sendJson(res, 400, { code: 400, message: '量表或就诊人不存在' });
        return;
      }
      const answers = Array.isArray(body.answers) ? body.answers : [];
      const score = answers.reduce((sum, item) => sum + Number(item.score || 0), 0);
      const maxScore = scale.questions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.score)), 0);
      const ratio = maxScore ? score / maxScore : 0;
      const riskLevel = ratio >= 0.7 ? '高' : ratio >= 0.4 ? '中' : '低';
      const result = {
        id: uuidv4(),
        scaleId: scale.id,
        scaleName: scale.name,
        patientId: patient.id,
        patientName: patient.name,
        ageBand: scale.ageBand,
        score,
        maxScore,
        riskLevel,
        suggestion: riskLevel === '高' ? '建议尽快预约儿童心理专科进一步评估。' : riskLevel === '中' ? '建议持续观察，并结合家庭支持干预。' : '当前风险较低，可继续保持规律观察。',
        answers,
        createdAt: nowIso()
      };
      assessments.unshift(result);
      writeData('assessments', assessments);
      addActivity('assessment_completed', '完成心理测评', `${patient.name} 完成 ${scale.name}，结果 ${riskLevel} 风险`);
      broadcast('assessment:completed', result);
      sendJson(res, 200, response(result, '提交成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/assessments') {
      sendJson(res, 200, response(readData('assessments')));
      return;
    }

    if (method === 'GET' && pathname === '/api/favorites') {
      const favorites = readData('favorites');
      const articles = enrichArticles(readData('articles'), favorites);
      const ids = favorites.filter((item) => item.userId === DEFAULT_USER.id).map((item) => item.articleId);
      sendJson(res, 200, response(articles.filter((item) => ids.includes(item.id) && item.status === '已发布')));
      return;
    }

    if (method === 'POST' && pathname === '/api/favorites') {
      const favorites = readData('favorites');
      const articleId = body.articleId;
      const existing = favorites.find((item) => item.userId === DEFAULT_USER.id && item.articleId === articleId);
      let active;
      if (existing) {
        writeData('favorites', favorites.filter((item) => item.id !== existing.id));
        active = false;
        addActivity('favorite_removed', '取消收藏科普内容', `内容 ${articleId} 已取消收藏`);
      } else {
        favorites.push({ id: uuidv4(), userId: DEFAULT_USER.id, articleId, createdAt: nowIso() });
        writeData('favorites', favorites);
        active = true;
        addActivity('favorite_added', '收藏科普内容', `内容 ${articleId} 已加入收藏`);
      }
      broadcast('favorite:updated', { articleId, active });
      sendJson(res, 200, response({ articleId, active }, active ? '收藏成功' : '已取消收藏'));
      return;
    }

    if (method === 'GET' && pathname === '/api/appointments') {
      const enriched = enrichAppointments(readData('appointments'), readData('doctors'), readData('hospitals'), readData('patients'));
      sendJson(res, 200, response(enriched));
      return;
    }

    if (method === 'POST' && pathname === '/api/appointments') {
      const doctors = readData('doctors');
      const hospitals = readData('hospitals');
      const patients = readData('patients');
      const appointments = readData('appointments');
      const schedules = readData('schedules');
      const doctor = doctors.find((item) => item.id === body.doctorId);
      const patient = patients.find((item) => item.id === body.patientId);
      const scheduleIndex = schedules.findIndex((item) => item.id === body.scheduleId && item.doctorId === body.doctorId);
      if (!doctor || !patient || scheduleIndex === -1) {
        sendJson(res, 400, { code: 400, message: '预约信息不完整' });
        return;
      }
      const schedule = schedules[scheduleIndex];
      if (schedule.availableSlots <= 0 || schedule.status === '停诊') {
        sendJson(res, 400, { code: 400, message: '该时段号源已满或停诊' });
        return;
      }
      const patientAge = getAge(patient.birthDate);
      if (patientAge < 0 || patientAge > 18) {
        sendJson(res, 400, { code: 400, message: '仅支持0-18岁儿童预约' });
        return;
      }
      const recentCount = appointments.filter((item) => item.patientId === patient.id && item.doctorId === doctor.id && item.status !== '已取消' && withinSevenDays(item.date, schedule.date)).length;
      if (recentCount >= 2) {
        sendJson(res, 400, { code: 400, message: '同一儿童同一医生7天内最多预约2次' });
        return;
      }
      schedules[scheduleIndex] = { ...schedule, availableSlots: schedule.availableSlots - 1, bookedSlots: schedule.bookedSlots + 1 };
      writeData('schedules', schedules);
      const appointment = {
        id: uuidv4(),
        userId: DEFAULT_USER.id,
        doctorId: doctor.id,
        patientId: patient.id,
        scheduleId: schedule.id,
        date: schedule.date,
        timeSlot: schedule.timeSlot,
        hospitalId: doctor.hospitalId,
        status: '待就诊',
        preConsultation: body.preConsultation,
        createdAt: nowIso()
      };
      appointments.unshift(appointment);
      writeData('appointments', appointments);
      addActivity('appointment_created', '新增预约订单', `${patient.name} 已预约 ${doctor.name} ${schedule.date} ${schedule.timeSlot}`);
      broadcast('slot:updated', schedules[scheduleIndex]);
      broadcast('appointment:created', appointment);
      sendJson(res, 200, response(enrichAppointments([appointment], doctors, hospitals, patients)[0], '预约成功'));
      return;
    }

    const cancelMatch = matchRoute(pathname, /^\/api\/appointments\/([^/]+)\/cancel$/);
    if (cancelMatch && method === 'PUT') {
      const appointments = readData('appointments');
      const schedules = readData('schedules');
      const doctors = readData('doctors');
      const hospitals = readData('hospitals');
      const patients = readData('patients');
      const index = appointments.findIndex((item) => item.id === cancelMatch[1]);
      if (index === -1) {
        sendJson(res, 404, { code: 404, message: '预约不存在' });
        return;
      }
      const appointment = appointments[index];
      if (appointment.status !== '待就诊') {
        sendJson(res, 400, { code: 400, message: '当前状态不可取消' });
        return;
      }
      if (!canCancel(appointment)) {
        sendJson(res, 400, { code: 400, message: '仅支持就诊前24小时取消预约' });
        return;
      }
      appointments[index] = { ...appointment, status: '已取消', cancelledAt: nowIso() };
      writeData('appointments', appointments);
      const scheduleIndex = schedules.findIndex((item) => item.id === appointment.scheduleId);
      if (scheduleIndex !== -1) {
        schedules[scheduleIndex] = {
          ...schedules[scheduleIndex],
          availableSlots: schedules[scheduleIndex].availableSlots + 1,
          bookedSlots: Math.max(0, schedules[scheduleIndex].bookedSlots - 1)
        };
        writeData('schedules', schedules);
        broadcast('slot:updated', schedules[scheduleIndex]);
      }
      addActivity('appointment_cancelled', '取消预约订单', `${appointment.id} 已取消`);
      broadcast('appointment:cancelled', appointments[index]);
      sendJson(res, 200, response(enrichAppointments([appointments[index]], doctors, hospitals, patients)[0], '取消成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/reviews/pending') {
      const appointments = readData('appointments').filter((item) => item.status === '已完成');
      const reviews = readData('reviews').filter((item) => item.type === 'review');
      const pending = appointments.filter((appointment) => !reviews.some((item) => item.appointmentId === appointment.id));
      sendJson(res, 200, response(pending));
      return;
    }

    if (method === 'GET' && pathname === '/api/reviews') {
      sendJson(res, 200, response(readData('reviews')));
      return;
    }

    if (method === 'POST' && pathname === '/api/reviews') {
      const reviews = readData('reviews');
      const review = { id: uuidv4(), userId: DEFAULT_USER.id, type: body.type || 'review', createdAt: nowIso(), ...body };
      reviews.unshift(review);
      writeData('reviews', reviews);
      addActivity(review.type === 'feedback' ? 'feedback_created' : 'review_created', review.type === 'feedback' ? '提交平台留言' : '提交就诊评价', review.content || review.message || '已提交');
      sendJson(res, 200, response(review, '提交成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/dashboard') {
      sendJson(res, 200, response(getDashboardSnapshot()));
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/articles') {
      sendJson(res, 200, response(enrichArticles(readData('articles'), readData('favorites'))));
      return;
    }

    if (method === 'POST' && pathname === '/api/admin/articles') {
      const articles = readData('articles');
      const article = { id: uuidv4(), createdAt: nowIso(), views: 0, status: '待审核', ...body };
      articles.unshift(article);
      writeData('articles', articles);
      sendJson(res, 200, response(article, '创建成功'));
      return;
    }

    const adminArticlePublishMatch = matchRoute(pathname, /^\/api\/admin\/articles\/([^/]+)\/publish$/);
    if (adminArticlePublishMatch && method === 'POST') {
      const articles = readData('articles');
      const index = articles.findIndex((item) => item.id === adminArticlePublishMatch[1]);
      if (index === -1) {
        sendJson(res, 404, { code: 404, message: '内容不存在' });
        return;
      }
      articles[index] = { ...articles[index], status: '已发布', publishedAt: nowIso() };
      writeData('articles', articles);
      addActivity('article_published', '发布科普内容', `${articles[index].title} 已发布`);
      broadcast('article:published', articles[index]);
      sendJson(res, 200, response(articles[index], '发布成功'));
      return;
    }

    const adminArticleMatch = matchRoute(pathname, /^\/api\/admin\/articles\/([^/]+)$/);
    if (adminArticleMatch && method === 'PUT') {
      const articles = readData('articles');
      const index = articles.findIndex((item) => item.id === adminArticleMatch[1]);
      if (index === -1) {
        sendJson(res, 404, { code: 404, message: '内容不存在' });
        return;
      }
      articles[index] = { ...articles[index], ...body, updatedAt: nowIso() };
      writeData('articles', articles);
      sendJson(res, 200, response(articles[index], '更新成功'));
      return;
    }

    if (adminArticleMatch && method === 'DELETE') {
      writeData('articles', readData('articles').filter((item) => item.id !== adminArticleMatch[1]));
      sendJson(res, 200, response(true, '删除成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/doctors') {
      const hospitals = readData('hospitals');
      sendJson(res, 200, response(readData('doctors').map((item) => withHospital(item, hospitals))));
      return;
    }

    if (method === 'POST' && pathname === '/api/admin/doctors') {
      const doctors = readData('doctors');
      const doctor = { id: uuidv4(), createdAt: nowIso(), ...body };
      doctors.unshift(doctor);
      writeData('doctors', doctors);
      sendJson(res, 200, response(doctor, '创建成功'));
      return;
    }

    const adminDoctorMatch = matchRoute(pathname, /^\/api\/admin\/doctors\/([^/]+)$/);
    if (adminDoctorMatch && method === 'PUT') {
      const doctors = readData('doctors');
      const index = doctors.findIndex((item) => item.id === adminDoctorMatch[1]);
      if (index === -1) {
        sendJson(res, 404, { code: 404, message: '医生不存在' });
        return;
      }
      doctors[index] = { ...doctors[index], ...body, updatedAt: nowIso() };
      writeData('doctors', doctors);
      sendJson(res, 200, response(doctors[index], '更新成功'));
      return;
    }

    if (adminDoctorMatch && method === 'DELETE') {
      writeData('doctors', readData('doctors').filter((item) => item.id !== adminDoctorMatch[1]));
      sendJson(res, 200, response(true, '删除成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/hospitals') {
      sendJson(res, 200, response(readData('hospitals')));
      return;
    }

    if (method === 'POST' && pathname === '/api/admin/hospitals') {
      const hospitals = readData('hospitals');
      const hospital = { id: uuidv4(), createdAt: nowIso(), ...body };
      hospitals.unshift(hospital);
      writeData('hospitals', hospitals);
      sendJson(res, 200, response(hospital, '创建成功'));
      return;
    }

    const adminHospitalMatch = matchRoute(pathname, /^\/api\/admin\/hospitals\/([^/]+)$/);
    if (adminHospitalMatch && method === 'PUT') {
      const hospitals = readData('hospitals');
      const index = hospitals.findIndex((item) => item.id === adminHospitalMatch[1]);
      if (index === -1) {
        sendJson(res, 404, { code: 404, message: '医院不存在' });
        return;
      }
      hospitals[index] = { ...hospitals[index], ...body, updatedAt: nowIso() };
      writeData('hospitals', hospitals);
      sendJson(res, 200, response(hospitals[index], '更新成功'));
      return;
    }

    if (adminHospitalMatch && method === 'DELETE') {
      writeData('hospitals', readData('hospitals').filter((item) => item.id !== adminHospitalMatch[1]));
      sendJson(res, 200, response(true, '删除成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/schedules') {
      const doctors = readData('doctors');
      sendJson(res, 200, response(readData('schedules').map((item) => ({ ...item, doctorName: (doctors.find((doctor) => doctor.id === item.doctorId) || {}).name || '-' }))));
      return;
    }

    if (method === 'POST' && pathname === '/api/admin/schedules') {
      const schedules = readData('schedules');
      const totalSlots = Number(body.totalSlots || 0);
      const schedule = { id: uuidv4(), bookedSlots: Number(body.bookedSlots || 0), availableSlots: Math.max(0, totalSlots - Number(body.bookedSlots || 0)), status: '正常', createdAt: nowIso(), ...body, totalSlots };
      schedules.unshift(schedule);
      writeData('schedules', schedules);
      sendJson(res, 200, response(schedule, '创建成功'));
      return;
    }

    const adminScheduleMatch = matchRoute(pathname, /^\/api\/admin\/schedules\/([^/]+)$/);
    if (adminScheduleMatch && method === 'PUT') {
      const schedules = readData('schedules');
      const index = schedules.findIndex((item) => item.id === adminScheduleMatch[1]);
      if (index === -1) {
        sendJson(res, 404, { code: 404, message: '排班不存在' });
        return;
      }
      const current = schedules[index];
      const nextTotal = Number(body.totalSlots ?? current.totalSlots);
      const nextBooked = Number(body.bookedSlots ?? current.bookedSlots);
      schedules[index] = { ...current, ...body, totalSlots: nextTotal, bookedSlots: nextBooked, availableSlots: Math.max(0, nextTotal - nextBooked), updatedAt: nowIso() };
      writeData('schedules', schedules);
      broadcast('slot:updated', schedules[index]);
      sendJson(res, 200, response(schedules[index], '更新成功'));
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/appointments') {
      sendJson(res, 200, response(enrichAppointments(readData('appointments'), readData('doctors'), readData('hospitals'), readData('patients'))));
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/appointments/export') {
      const appointments = enrichAppointments(readData('appointments'), readData('doctors'), readData('hospitals'), readData('patients'));
      const lines = [['订单ID', '状态', '日期', '时段', '医生', '医院', '儿童', '年龄段'].join(',')].concat(appointments.map((item) => [item.id, item.status, item.date, item.timeSlot, item.doctor ? item.doctor.name : '', item.doctor && item.doctor.hospital ? item.doctor.hospital.name : '', item.patient ? item.patient.name : '', item.patient ? getAgeBand(item.patient.age) : ''].join(',')));
      sendText(res, 200, `\uFEFF${lines.join('\n')}`, 'text/csv; charset=utf-8');
      return;
    }

    if (method === 'GET' && pathname === '/api/admin/assessments') {
      sendJson(res, 200, response(getAssessmentAnalytics()));
      return;
    }

    sendJson(res, 404, { code: 404, message: '接口不存在' });
  } catch (error) {
    sendJson(res, 500, { code: 500, message: error.message || '服务异常' });
  }
}

function serveStatic(req, res, url) {
  const pathname = decodeURIComponent(url.pathname);
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname.replace(/^\//, ''));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendText(res, 403, 'Forbidden');
    return;
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    sendText(res, 404, 'Not Found');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  setCommonHeaders(res, contentType);
  res.writeHead(200);
  fs.createReadStream(filePath).pipe(res);
}

async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith('/api/')) {
    await handleApi(req, res, url);
    return;
  }
  serveStatic(req, res, url);
}

function encodeFrame(message) {
  const payload = Buffer.from(message);
  const length = payload.length;
  let header;
  if (length < 126) {
    header = Buffer.from([0x81, length]);
  } else if (length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }
  return Buffer.concat([header, payload]);
}

function sendSocket(socket, message) {
  socket.write(encodeFrame(message));
}

server.on('upgrade', (req, socket) => {
  if ((req.headers.upgrade || '').toLowerCase() !== 'websocket') {
    socket.destroy();
    return;
  }
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.destroy();
    return;
  }
  const acceptKey = crypto.createHash('sha1').update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest('base64');
  socket.write([
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
    '',
    ''
  ].join('\r\n'));
  sockets.add(socket);
  sendSocket(socket, JSON.stringify({ type: 'connected', data: { message: 'websocket ready' }, timestamp: nowIso() }));
  socket.on('close', () => sockets.delete(socket));
  socket.on('end', () => sockets.delete(socket));
  socket.on('error', () => sockets.delete(socket));
  socket.on('data', (buffer) => {
    const opcode = buffer[0] & 0x0f;
    if (opcode === 0x8) {
      sockets.delete(socket);
      socket.end();
    }
  });
});

ensureDataFiles();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});