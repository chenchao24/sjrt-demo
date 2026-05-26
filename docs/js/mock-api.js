/* =========================================================
   Mock API — 盛京儿童心理健康服务平台 (GitHub Pages 静态演示版)
   所有 /api/ 请求由此文件拦截，数据存储在内存中。
   刷新页面后数据恢复为种子状态。
   ========================================================= */
(function () {
  'use strict';

  // ──────────────────────────────────────────────────────────
  // 1. SEED DATA  (头像路径已改为相对路径，适配 docs/ 子目录)
  // ──────────────────────────────────────────────────────────
  var SEED = {
    articles: [
      {"id":"article-001","title":"孩子总说肚子疼，可能是焦虑在求助","summary":"从身体不适识别儿童焦虑的常见信号。","author":"盛京儿童心理团队","category":"情绪","contentType":"图文","cover":"../css/img/pic/doctor-avatar-12.png","content":"不少儿童会把焦虑表达成腹痛、头晕、睡不着。家长可先观察触发场景，例如上学前、考试前、见陌生人前是否更明显。与其急着否定，不如先承接孩子的感受，再逐步帮助其命名情绪。","videoUrl":"","status":"已发布","views":1860,"publishedAt":"2026-05-01T10:00:00.000Z"},
      {"id":"article-002","title":"写作业磨蹭，不一定只是拖拉","summary":"区分习惯问题与注意力困难的几个观察点。","author":"学习行为门诊","category":"学习","contentType":"图文","cover":"../css/img/pic/doctor-avatar-13.png","content":"如果孩子在感兴趣的事情上也难以持续专注，且经常丢三落四、难以按步骤完成任务，就需要进一步评估注意力维度。家长可以先减少指令长度，并把任务拆分成更小的步骤。","videoUrl":"","status":"已发布","views":1520,"publishedAt":"2026-05-02T10:00:00.000Z"},
      {"id":"article-003","title":"亲子冲突升级时，先稳住关系再谈规则","summary":"三步缓和亲子冲突的家庭沟通策略。","author":"家庭治疗组","category":"亲子","contentType":"图文","cover":"../css/img/pic/doctor-avatar-14.png","content":"当情绪已经升高时，继续讲道理往往无效。先停止对抗、给出简短共情，再在情绪回落后回到规则讨论，是更有效的路径。","videoUrl":"","status":"已发布","views":1389,"publishedAt":"2026-05-03T10:00:00.000Z"},
      {"id":"article-004","title":"0-3岁发育观察清单：这些信号别错过","summary":"适合家长快速自查的发育行为观察提示。","author":"发育行为中心","category":"发育","contentType":"图文","cover":"../css/img/pic/doctor-avatar-15.png","content":"家长可从语言、眼神交流、模仿、回应名字等维度观察儿童发展。如果与同龄差异持续明显，建议尽早评估，早识别、早干预通常效果更好。","videoUrl":"","status":"已发布","views":980,"publishedAt":"2026-05-04T10:00:00.000Z"},
      {"id":"article-005","title":"孩子总熬夜？建立睡眠节律比催睡更重要","summary":"改善儿童睡眠的四个基础动作。","author":"睡眠医学中心","category":"睡眠","contentType":"图文","cover":"../css/img/pic/doctor-avatar-16.png","content":"固定起床时间、减少睡前屏幕刺激、建立重复的睡前流程，是改善睡眠最基础也最有效的动作。若伴随情绪低落或白天注意力显著下降，应考虑进一步评估。","videoUrl":"","status":"已发布","views":1655,"publishedAt":"2026-05-05T10:00:00.000Z"},
      {"id":"article-006","title":"孩子社交退缩，家长能做的不是替他说话","summary":"帮助儿童建立社交信心的家庭支持方法。","author":"学校适应项目组","category":"情绪","contentType":"图文","cover":"../css/img/pic/doctor-avatar-17.png","content":"社交支持的重点不是替孩子完成社交，而是通过小目标练习、情境预演和肯定尝试，帮助其逐步积累成功经验。","videoUrl":"","status":"已发布","views":1120,"publishedAt":"2026-05-06T10:00:00.000Z"},
      {"id":"article-007","title":"视频：考前情绪安抚的家庭实操","summary":"3分钟了解家长在考试周可以怎么做。","author":"情绪行为门诊","category":"情绪","contentType":"视频","cover":"../css/img/pic/doctor-avatar-18.png","content":"视频内容示意：围绕考前节律、饮食、沟通三个重点展开。","videoUrl":"https://www.w3schools.com/html/mov_bbb.mp4","status":"已发布","views":2280,"publishedAt":"2026-05-07T10:00:00.000Z"},
      {"id":"article-008","title":"视频：低龄儿童语言发育家庭观察法","summary":"通过家庭互动观察语言发育信号。","author":"发育行为中心","category":"发育","contentType":"视频","cover":"../css/img/pic/doctor-avatar-19.png","content":"视频内容示意：观察眼神、回应和模仿。","videoUrl":"https://www.w3schools.com/html/movie.mp4","status":"已发布","views":1290,"publishedAt":"2026-05-08T10:00:00.000Z"},
      {"id":"article-009","title":"视频：睡前一小时怎样做更容易入睡","summary":"一套可直接执行的儿童睡前流程。","author":"睡眠医学中心","category":"睡眠","contentType":"视频","cover":"../css/img/pic/doctor-avatar-20.png","content":"视频内容示意：洗漱、阅读、灯光切换和噪音管理。","videoUrl":"https://www.w3schools.com/html/mov_bbb.mp4","status":"已发布","views":1450,"publishedAt":"2026-05-09T10:00:00.000Z"},
      {"id":"article-010","title":"视频：课堂注意力支持策略","summary":"家校协作下的注意力支持建议。","author":"学习行为门诊","category":"学习","contentType":"视频","cover":"../css/img/pic/doctor-avatar-12.png","content":"视频内容示意：座位安排、任务拆解与及时强化。","videoUrl":"https://www.w3schools.com/html/movie.mp4","status":"待审核","views":810,"publishedAt":""}
    ],
    doctors: [
      {"id":"doctor-001","name":"赵舒宁","title":"主任医师","hospitalId":"hospital-001","specialties":["情绪管理","亲子关系","焦虑干预"],"goodAt":"儿童焦虑、情绪行为问题的综合干预","avatar":"../css/img/header/doctor-avatar-01.png","intro":"从事儿童青少年心理专科 18 年，擅长门诊评估与家庭干预方案制定。"},
      {"id":"doctor-002","name":"周以宁","title":"副主任医师","hospitalId":"hospital-002","specialties":["学习困难","注意力","行为问题"],"goodAt":"学习困难、注意缺陷与行为问题评估","avatar":"../css/img/header/doctor-avatar-03.png","intro":"长期服务于学龄儿童心理门诊，重视量表与行为观察结合。"},
      {"id":"doctor-003","name":"顾安可","title":"主任医师","hospitalId":"hospital-003","specialties":["发育评估","社交沟通","早期干预"],"goodAt":"0-6岁发育与社交沟通障碍筛查","avatar":"../css/img/header/doctor-avatar-04.png","intro":"擅长低龄儿童发育筛查、语言与社交训练指导。"},
      {"id":"doctor-004","name":"林初禾","title":"副主任医师","hospitalId":"hospital-004","specialties":["睡眠","情绪","青春期支持"],"goodAt":"睡眠障碍与青春期情绪问题门诊","avatar":"../css/img/header/doctor-avatar-05.png","intro":"关注睡眠与情绪的双向影响，临床沟通细腻。"},
      {"id":"doctor-005","name":"韩知夏","title":"主治医师","hospitalId":"hospital-001","specialties":["亲子关系","行为矫正","家庭治疗"],"goodAt":"亲子冲突与家庭教养支持","avatar":"../css/img/header/doctor-avatar-06.png","intro":"专注于家庭情境中的行为管理与家长训练。"},
      {"id":"doctor-006","name":"裴清越","title":"主任医师","hospitalId":"hospital-005","specialties":["抑郁情绪","校园适应","危机评估"],"goodAt":"青少年抑郁焦虑与危机识别","avatar":"../css/img/header/doctor-avatar-07.png","intro":"擅长中高风险个案的分级评估与转诊建议。"},
      {"id":"doctor-007","name":"程晞月","title":"副主任医师","hospitalId":"hospital-003","specialties":["发育","睡眠","喂养行为"],"goodAt":"婴幼儿睡眠与发育行为咨询","avatar":"../css/img/header/doctor-avatar-08.png","intro":"面向0-3岁儿童家庭，擅长睡眠与喂养行为指导。"},
      {"id":"doctor-008","name":"沈望舒","title":"主治医师","hospitalId":"hospital-002","specialties":["社交支持","情绪","学校适应"],"goodAt":"社交退缩与学校适应困难评估","avatar":"../css/img/header/doctor-avatar-09.png","intro":"重视学校场景与家庭场景的联合干预。"},
      {"id":"doctor-009","name":"陆星沅","title":"副主任医师","hospitalId":"hospital-004","specialties":["注意力","学习","睡眠"],"goodAt":"学龄期注意力问题与睡眠管理","avatar":"../css/img/header/doctor-avatar-10.png","intro":"善于把量表结果转化为家庭与学校的可执行建议。"},
      {"id":"doctor-010","name":"姜叙白","title":"主任医师","hospitalId":"hospital-005","specialties":["亲子关系","情绪","学习困难"],"goodAt":"复杂型儿童心理问题综合门诊","avatar":"../css/img/header/doctor-avatar-11.png","intro":"擅长跨问题共病场景下的综合评估与多学科协同。"},
      {"id":"d-nhu-001","name":"李明辉","title":"主治医师","hospitalId":"hospital-nanhu","department":"儿童心理门诊","price":12,"availablePeriod":"全天","specialties":["情绪调节","焦虑抑郁","行为问题"],"goodAt":"儿童情绪与行为问题的门诊评估与干预","avatar":"../css/img/header/doctor-avatar-01.png","intro":"从事儿童青少年心理门诊工作8年，擅长情绪障碍及行为问题的综合评估。"},
      {"id":"d-nhu-002","name":"张晓芳","title":"副主任医师","hospitalId":"hospital-nanhu","department":"儿童心理门诊","price":12,"availablePeriod":"上午","specialties":["学习障碍","注意力","社交困难"],"goodAt":"学龄期儿童注意力缺陷与学习困难评估","avatar":"../css/img/header/doctor-avatar-02.png","intro":"专注学龄期儿童心理健康，擅长注意缺陷多动障碍的系统诊疗。"},
      {"id":"d-nhu-003","name":"王德明","title":"主任医师","hospitalId":"hospital-nanhu","department":"专家专科门诊","price":50,"availablePeriod":"全天","specialties":["青少年抑郁","亲子冲突","危机干预"],"goodAt":"青少年抑郁、情绪危机的专家级评估与干预","avatar":"../css/img/header/doctor-avatar-03.png","intro":"从事儿童青少年精神心理专科20年，主持多项省级科研课题，擅长复杂情绪障碍。"},
      {"id":"d-nhu-004","name":"陈丽华","title":"主任医师","hospitalId":"hospital-nanhu","department":"专家专科门诊","price":50,"availablePeriod":"下午","specialties":["自闭症谱系","发育障碍","家庭治疗"],"goodAt":"自闭症谱系障碍及发育迟缓的专家会诊","avatar":"../css/img/header/doctor-avatar-04.png","intro":"国内自闭症谱系障碍领域知名专家，曾赴美国进修，主导多项国际合作研究。"},
      {"id":"d-nhu-005","name":"刘志远","title":"主治医师","hospitalId":"hospital-nanhu","department":"儿童心理门诊","price":12,"availablePeriod":"晚上","specialties":["睡眠问题","考试焦虑","情绪疏导"],"goodAt":"青少年考试焦虑与睡眠障碍的心理疏导","avatar":"../css/img/header/doctor-avatar-05.png","intro":"擅长以认知行为疗法结合正念技术，帮助青少年缓解学业压力及睡眠困扰。"}
    ],
    hospitals: [
      {"id":"hospital-nanhu","name":"盛京医院（南湖院区）","address":"沈阳市沈河区南湖大街35号","phone":"024-96615","distance":0.8,"specialFlow":true,"tag":"专属挂号通道"},
      {"id":"hospital-001","name":"盛京儿童心理中心","address":"沈阳市和平区新华路18号","phone":"024-31180001","distance":1.2},
      {"id":"hospital-002","name":"联盟北部儿童专科医院","address":"沈阳市皇姑区昆山路66号","phone":"024-31180002","distance":3.8},
      {"id":"hospital-003","name":"盛京联盟发育行为门诊","address":"沈阳市浑南区创新路120号","phone":"024-31180003","distance":8.5},
      {"id":"hospital-004","name":"儿童睡眠与情绪医学中心","address":"沈阳市沈河区文化东路28号","phone":"024-31180004","distance":2.1},
      {"id":"hospital-005","name":"联盟青少年心理康复医院","address":"沈阳市铁西区启工街99号","phone":"024-31180005","distance":5.3}
    ],
    scales: [
      {"id":"scale-001","name":"儿童情绪风险快速筛查","ageBand":"6-12岁","problemType":"情绪","description":"用于识别孩子近期情绪波动与焦虑风险。","questions":[{"id":"q1","title":"孩子最近是否经常无明显原因地紧张、担心？","options":[{"label":"几乎没有","score":0},{"label":"偶尔","score":1},{"label":"经常","score":2}]},{"id":"q2","title":"是否因为情绪问题影响上学或日常活动？","options":[{"label":"没有影响","score":0},{"label":"轻度影响","score":1},{"label":"明显影响","score":2}]},{"id":"q3","title":"孩子是否常抱怨头痛、肚子痛但查不出明显器质性问题？","options":[{"label":"几乎没有","score":0},{"label":"偶尔出现","score":1},{"label":"频繁出现","score":2}]},{"id":"q4","title":"面对分离或陌生环境时，孩子是否明显不安？","options":[{"label":"基本不会","score":0},{"label":"有时会","score":1},{"label":"经常如此","score":2}]},{"id":"q5","title":"过去两周睡眠质量如何？","options":[{"label":"基本正常","score":0},{"label":"偶尔受影响","score":1},{"label":"明显变差","score":2}]}]},
      {"id":"scale-002","name":"学龄儿童注意力表现筛查","ageBand":"6-12岁","problemType":"学习","description":"用于观察注意力、任务维持与冲动表现。","questions":[{"id":"q1","title":"孩子做作业时是否容易被周围刺激打断？","options":[{"label":"很少","score":0},{"label":"偶尔","score":1},{"label":"经常","score":2}]},{"id":"q2","title":"孩子是否经常遗漏步骤或忘记老师交代的任务？","options":[{"label":"几乎不会","score":0},{"label":"偶尔","score":1},{"label":"频繁","score":2}]},{"id":"q3","title":"孩子排队或轮流时是否难以等待？","options":[{"label":"可以等待","score":0},{"label":"偶尔着急","score":1},{"label":"经常插队或打断","score":2}]},{"id":"q4","title":"在感兴趣的活动中，孩子能否维持专注？","options":[{"label":"能较好维持","score":0},{"label":"时间一般","score":1},{"label":"仍明显难以维持","score":2}]},{"id":"q5","title":"孩子是否常常坐不住或需要不断活动？","options":[{"label":"基本不会","score":0},{"label":"偶尔","score":1},{"label":"明显频繁","score":2}]}]},
      {"id":"scale-003","name":"幼儿发育与社交沟通观察表","ageBand":"3-6岁","problemType":"社交","description":"用于家长观察幼儿在回应、模仿和社交互动方面的表现。","questions":[{"id":"q1","title":"孩子被叫名字时是否能稳定回应？","options":[{"label":"基本都能","score":0},{"label":"有时反应慢","score":1},{"label":"经常无回应","score":2}]},{"id":"q2","title":"孩子是否愿意和同龄人一起玩？","options":[{"label":"愿意","score":0},{"label":"需要引导","score":1},{"label":"明显回避","score":2}]},{"id":"q3","title":"孩子是否会用手指或眼神主动分享兴趣？","options":[{"label":"经常会","score":0},{"label":"偶尔会","score":1},{"label":"很少会","score":2}]},{"id":"q4","title":"孩子是否能模仿大人的动作或简单语言？","options":[{"label":"可以","score":0},{"label":"偶尔","score":1},{"label":"明显困难","score":2}]},{"id":"q5","title":"孩子日常是否出现固定重复动作并难以转移？","options":[{"label":"很少","score":0},{"label":"偶尔","score":1},{"label":"经常","score":2}]}]}
    ],
    schedules: [
      {"id":"schedule-001","doctorId":"doctor-001","date":"2026-05-21","timeSlot":"09:00-09:30","period":"上午","totalSlots":8,"bookedSlots":4,"availableSlots":4,"status":"正常"},
      {"id":"schedule-002","doctorId":"doctor-001","date":"2026-05-21","timeSlot":"14:00-14:30","period":"下午","totalSlots":8,"bookedSlots":5,"availableSlots":3,"status":"正常"},
      {"id":"schedule-003","doctorId":"doctor-002","date":"2026-05-21","timeSlot":"10:00-10:30","period":"上午","totalSlots":10,"bookedSlots":4,"availableSlots":6,"status":"正常"},
      {"id":"schedule-004","doctorId":"doctor-003","date":"2026-05-22","timeSlot":"09:30-10:00","period":"上午","totalSlots":6,"bookedSlots":1,"availableSlots":5,"status":"正常"},
      {"id":"schedule-005","doctorId":"doctor-004","date":"2026-05-22","timeSlot":"13:30-14:00","period":"下午","totalSlots":8,"bookedSlots":2,"availableSlots":6,"status":"正常"},
      {"id":"schedule-006","doctorId":"doctor-005","date":"2026-05-23","timeSlot":"09:00-09:30","period":"上午","totalSlots":6,"bookedSlots":2,"availableSlots":4,"status":"正常"},
      {"id":"schedule-007","doctorId":"doctor-006","date":"2026-05-23","timeSlot":"15:00-15:30","period":"下午","totalSlots":6,"bookedSlots":5,"availableSlots":1,"status":"正常"},
      {"id":"schedule-008","doctorId":"doctor-007","date":"2026-05-24","timeSlot":"10:30-11:00","period":"上午","totalSlots":8,"bookedSlots":2,"availableSlots":6,"status":"正常"},
      {"id":"schedule-009","doctorId":"doctor-008","date":"2026-05-24","timeSlot":"14:30-15:00","period":"下午","totalSlots":8,"bookedSlots":3,"availableSlots":5,"status":"正常"},
      {"id":"schedule-010","doctorId":"doctor-009","date":"2026-05-25","timeSlot":"09:00-09:30","period":"上午","totalSlots":10,"bookedSlots":7,"availableSlots":3,"status":"正常"},
      {"id":"schedule-011","doctorId":"doctor-010","date":"2026-05-25","timeSlot":"13:00-13:30","period":"下午","totalSlots":8,"bookedSlots":4,"availableSlots":4,"status":"正常"},
      {"id":"schedule-012","doctorId":"doctor-001","date":"2026-05-26","timeSlot":"09:00-09:30","period":"上午","totalSlots":8,"bookedSlots":1,"availableSlots":7,"status":"正常"},
      {"id":"schedule-013","doctorId":"doctor-002","date":"2026-05-26","timeSlot":"14:00-14:30","period":"下午","totalSlots":8,"bookedSlots":2,"availableSlots":6,"status":"正常"},
      {"id":"schedule-014","doctorId":"doctor-003","date":"2026-05-27","timeSlot":"10:00-10:30","period":"上午","totalSlots":6,"bookedSlots":1,"availableSlots":5,"status":"正常"},
      {"id":"schedule-015","doctorId":"doctor-004","date":"2026-05-27","timeSlot":"16:00-16:30","period":"下午","totalSlots":8,"bookedSlots":0,"availableSlots":8,"status":"正常"},
      {"id":"schedule-016","doctorId":"doctor-005","date":"2026-05-28","timeSlot":"09:30-10:00","period":"上午","totalSlots":8,"bookedSlots":2,"availableSlots":6,"status":"正常"},
      {"id":"schedule-017","doctorId":"doctor-006","date":"2026-05-28","timeSlot":"15:30-16:00","period":"下午","totalSlots":6,"bookedSlots":3,"availableSlots":3,"status":"正常"},
      {"id":"schedule-018","doctorId":"doctor-007","date":"2026-05-29","timeSlot":"10:00-10:30","period":"上午","totalSlots":6,"bookedSlots":1,"availableSlots":5,"status":"正常"},
      {"id":"schedule-019","doctorId":"doctor-008","date":"2026-05-29","timeSlot":"14:00-14:30","period":"下午","totalSlots":8,"bookedSlots":2,"availableSlots":6,"status":"正常"},
      {"id":"schedule-020","doctorId":"doctor-009","date":"2026-05-30","timeSlot":"09:00-09:30","period":"上午","totalSlots":10,"bookedSlots":4,"availableSlots":6,"status":"正常"},
      {"id":"schedule-021","doctorId":"doctor-010","date":"2026-05-30","timeSlot":"13:30-14:00","period":"下午","totalSlots":8,"bookedSlots":4,"availableSlots":4,"status":"正常"},
      {"id":"s-nhu-001","doctorId":"d-nhu-001","date":"2026-05-22","timeSlot":"08:30-09:00","period":"上午","totalSlots":8,"bookedSlots":8,"availableSlots":0,"status":"正常"},
      {"id":"s-nhu-002","doctorId":"d-nhu-001","date":"2026-05-22","timeSlot":"14:00-14:30","period":"下午","totalSlots":8,"bookedSlots":8,"availableSlots":0,"status":"正常"},
      {"id":"s-nhu-003","doctorId":"d-nhu-002","date":"2026-05-22","timeSlot":"09:00-09:30","period":"上午","totalSlots":6,"bookedSlots":6,"availableSlots":0,"status":"正常"},
      {"id":"s-nhu-004","doctorId":"d-nhu-003","date":"2026-05-22","timeSlot":"09:30-10:00","period":"上午","totalSlots":5,"bookedSlots":5,"availableSlots":0,"status":"正常"},
      {"id":"s-nhu-005","doctorId":"d-nhu-003","date":"2026-05-22","timeSlot":"15:00-15:30","period":"下午","totalSlots":5,"bookedSlots":5,"availableSlots":0,"status":"正常"},
      {"id":"s-nhu-006","doctorId":"d-nhu-004","date":"2026-05-22","timeSlot":"14:30-15:00","period":"下午","totalSlots":4,"bookedSlots":4,"availableSlots":0,"status":"正常"},
      {"id":"s-nhu-007","doctorId":"d-nhu-005","date":"2026-05-22","timeSlot":"19:00-19:30","period":"晚上","totalSlots":8,"bookedSlots":8,"availableSlots":0,"status":"正常"},
      {"id":"s-nhu-011","doctorId":"d-nhu-001","date":"2026-05-23","timeSlot":"08:30-09:00","period":"上午","totalSlots":8,"bookedSlots":3,"availableSlots":5,"status":"正常"},
      {"id":"s-nhu-012","doctorId":"d-nhu-001","date":"2026-05-23","timeSlot":"09:00-09:30","period":"上午","totalSlots":8,"bookedSlots":2,"availableSlots":6,"status":"正常"},
      {"id":"s-nhu-013","doctorId":"d-nhu-002","date":"2026-05-23","timeSlot":"09:30-10:00","period":"上午","totalSlots":6,"bookedSlots":1,"availableSlots":5,"status":"正常"},
      {"id":"s-nhu-014","doctorId":"d-nhu-003","date":"2026-05-23","timeSlot":"14:00-14:30","period":"下午","totalSlots":5,"bookedSlots":2,"availableSlots":3,"status":"正常"},
      {"id":"s-nhu-015","doctorId":"d-nhu-004","date":"2026-05-23","timeSlot":"14:30-15:00","period":"下午","totalSlots":4,"bookedSlots":1,"availableSlots":3,"status":"正常"},
      {"id":"s-nhu-016","doctorId":"d-nhu-005","date":"2026-05-23","timeSlot":"19:00-19:30","period":"晚上","totalSlots":8,"bookedSlots":4,"availableSlots":4,"status":"正常"},
      {"id":"s-nhu-021","doctorId":"d-nhu-001","date":"2026-05-24","timeSlot":"08:30-09:00","period":"上午","totalSlots":8,"bookedSlots":2,"availableSlots":6,"status":"正常"},
      {"id":"s-nhu-022","doctorId":"d-nhu-002","date":"2026-05-24","timeSlot":"09:00-09:30","period":"上午","totalSlots":6,"bookedSlots":0,"availableSlots":6,"status":"正常"},
      {"id":"s-nhu-023","doctorId":"d-nhu-003","date":"2026-05-24","timeSlot":"10:00-10:30","period":"上午","totalSlots":5,"bookedSlots":3,"availableSlots":2,"status":"正常"},
      {"id":"s-nhu-031","doctorId":"d-nhu-001","date":"2026-05-26","timeSlot":"08:30-09:00","period":"上午","totalSlots":8,"bookedSlots":1,"availableSlots":7,"status":"正常"},
      {"id":"s-nhu-032","doctorId":"d-nhu-002","date":"2026-05-26","timeSlot":"09:00-09:30","period":"上午","totalSlots":6,"bookedSlots":0,"availableSlots":6,"status":"正常"},
      {"id":"s-nhu-033","doctorId":"d-nhu-003","date":"2026-05-26","timeSlot":"14:00-14:30","period":"下午","totalSlots":5,"bookedSlots":0,"availableSlots":5,"status":"正常"},
      {"id":"s-nhu-034","doctorId":"d-nhu-004","date":"2026-05-26","timeSlot":"14:30-15:00","period":"下午","totalSlots":4,"bookedSlots":2,"availableSlots":2,"status":"正常"},
      {"id":"s-nhu-035","doctorId":"d-nhu-005","date":"2026-05-26","timeSlot":"19:00-19:30","period":"晚上","totalSlots":8,"bookedSlots":3,"availableSlots":5,"status":"正常"}
    ],
    appointments: [
      {"id":"appointment-001","userId":"parent-001","doctorId":"doctor-001","patientId":"patient-001","scheduleId":"schedule-001","date":"2026-05-21","period":"上午","hospitalId":"hospital-001","status":"已审核","reviewNote":"资料完整，安排就诊","reviewedAt":"2026-05-19T09:00:00.000Z","preConsultation":{"mainIssue":"近两个月频繁焦虑，临睡前明显加重","duration":"2个月","history":"否","behavior":"睡前反复确认第二天事项","development":"发育正常","familyChange":"近期升学压力增加"},"createdAt":"2026-05-18T08:30:00.000Z"},
      {"id":"appointment-002","userId":"parent-001","doctorId":"doctor-005","patientId":"patient-001","scheduleId":"schedule-007","date":"2026-05-10","period":"上午","hospitalId":"hospital-001","status":"已完成","reviewNote":"已安排就诊","reviewedAt":"2026-05-06T10:00:00.000Z","preConsultation":{"mainIssue":"亲子沟通冲突明显","duration":"3个月","history":"否","behavior":"作业期间对抗明显","development":"发育正常","familyChange":"搬家适应中"},"createdAt":"2026-05-05T09:30:00.000Z"},
      {"id":"appointment-003","userId":"parent-001","doctorId":"doctor-004","patientId":"patient-002","scheduleId":"schedule-005","date":"2026-05-08","period":"下午","hospitalId":"hospital-004","status":"已取消","preConsultation":{"mainIssue":"睡眠紊乱，入睡困难","duration":"1个月","history":"否","behavior":"入睡困难，夜间多醒","development":"语言稍慢","familyChange":"无"},"createdAt":"2026-05-01T08:20:00.000Z","cancelledAt":"2026-05-06T09:00:00.000Z"},
      {"id":"appointment-004","userId":"parent-001","doctorId":"doctor-002","patientId":"patient-001","scheduleId":"schedule-003","date":"2026-05-28","period":"上午","hospitalId":"hospital-002","status":"待接诊","preConsultation":{"mainIssue":"注意力不集中，课堂表现明显下降","duration":"约2个月","history":"否","behavior":"易分心，做作业拖延","development":"生长发育正常","familyChange":"近期升入新学校"},"createdAt":"2026-05-20T09:10:00.000Z"},
      {"id":"appointment-005","userId":"parent-001","doctorId":"doctor-007","patientId":"patient-002","scheduleId":"schedule-010","date":"2026-05-29","period":"下午","hospitalId":"hospital-003","status":"待接诊","preConsultation":{"mainIssue":"情绪波动大，哭闹频繁","duration":"3周","history":"否","behavior":"易怒，对挫折容忍度低","development":"发育正常","familyChange":"父母工作繁忙，陪伴减少"},"createdAt":"2026-05-20T10:30:00.000Z"},
      {"id":"appointment-006","userId":"parent-001","doctorId":"doctor-010","patientId":"patient-001","scheduleId":"schedule-021","date":"2026-05-30","period":"下午","hospitalId":"hospital-005","status":"已审核","reviewNote":"建议携带此前测评报告","reviewedAt":"2026-05-19T14:00:00.000Z","preConsultation":{"mainIssue":"社交退缩，不愿参与集体活动","duration":"1个月","history":"否","behavior":"课间独处，拒绝参与游戏","development":"发育正常","familyChange":"转学后适应困难"},"createdAt":"2026-05-17T11:00:00.000Z"},
      {"id":"appointment-007","userId":"parent-001","doctorId":"doctor-003","patientId":"patient-002","scheduleId":"schedule-004","date":"2026-04-15","period":"上午","hospitalId":"hospital-003","status":"已完成","reviewNote":"已安排就诊","reviewedAt":"2026-04-10T09:00:00.000Z","preConsultation":{"mainIssue":"语言发育迟缓，词汇量偏少","duration":"半年","history":"否","behavior":"表达意愿困难，理解能力正常","development":"语言稍迟，运动正常","familyChange":"无"},"createdAt":"2026-04-08T10:00:00.000Z"}
    ],
    patients: [
      {"id":"patient-001","userId":"parent-001","name":"王乐乐","idCard":"210102201603156728","birthDate":"2016-03-15","gender":"女","grade":"四年级","relationship":"母女","phone":"13800001111","emergencyContact":"王晨曦","emergencyPhone":"13800001111","createdAt":"2026-05-01T10:00:00.000Z"},
      {"id":"patient-002","userId":"parent-001","name":"王小川","idCard":"210102202009118516","birthDate":"2020-09-11","gender":"男","grade":"幼儿园中班","relationship":"母子","phone":"13800001111","emergencyContact":"王晨曦","emergencyPhone":"13800001111","createdAt":"2026-05-03T10:00:00.000Z"}
    ],
    assessments: [
      {"id":"86c78e0b-6703-4394-9ba9-11416db1f4bf","scaleId":"scale-002","scaleName":"学龄儿童注意力表现筛查","patientId":"patient-001","patientName":"王乐乐","ageBand":"6-12岁","score":6,"maxScore":10,"riskLevel":"中","suggestion":"建议持续观察，并结合家庭支持干预。","answers":[{"label":"很少","score":0},{"label":"偶尔","score":1},{"label":"经常插队或打断","score":2},{"label":"仍明显难以维持","score":2},{"label":"偶尔","score":1}],"createdAt":"2026-05-19T07:48:16.354Z"},
      {"id":"d27b2c9a-13af-400e-9b13-9175cb1a39b6","scaleId":"scale-001","scaleName":"儿童情绪风险快速筛查","patientId":"patient-001","patientName":"王乐乐","ageBand":"6-12岁","score":2,"maxScore":10,"riskLevel":"低","suggestion":"当前风险较低，可继续保持规律观察。","answers":[{"label":"几乎没有","score":0},{"label":"轻度影响","score":1},{"label":"几乎没有","score":0},{"label":"有时会","score":1},{"label":"基本正常","score":0}],"createdAt":"2026-05-19T06:17:01.095Z"},
      {"id":"7cc465b3-0f11-42ac-99f4-dfd09bff6661","scaleId":"scale-001","scaleName":"儿童情绪风险快速筛查","patientId":"patient-001","patientName":"王乐乐","ageBand":"6-12岁","score":4,"maxScore":10,"riskLevel":"中","suggestion":"建议持续观察，并结合家庭支持干预。","answers":[{"label":"偶尔","score":1},{"label":"没有影响","score":0},{"label":"偶尔出现","score":1},{"label":"经常如此","score":2},{"label":"基本正常","score":0}],"createdAt":"2026-05-19T05:00:46.670Z"},
      {"id":"assessment-001","scaleId":"scale-001","scaleName":"儿童情绪风险快速筛查","patientId":"patient-001","patientName":"王乐乐","ageBand":"6-12岁","score":7,"maxScore":10,"riskLevel":"高","suggestion":"建议尽快预约儿童心理专科进一步评估。","answers":[],"createdAt":"2026-05-17T15:20:00.000Z"},
      {"id":"assessment-002","scaleId":"scale-002","scaleName":"学龄儿童注意力表现筛查","patientId":"patient-001","patientName":"王乐乐","ageBand":"6-12岁","score":4,"maxScore":10,"riskLevel":"中","suggestion":"建议持续观察，并结合家庭支持干预。","answers":[],"createdAt":"2026-05-14T11:40:00.000Z"}
    ],
    favorites: [
      {"id":"favorite-001","userId":"parent-001","articleId":"article-001","createdAt":"2026-05-17T12:00:00.000Z"},
      {"id":"favorite-002","userId":"parent-001","articleId":"article-005","createdAt":"2026-05-18T13:10:00.000Z"}
    ],
    reviews: [
      {"id":"review-001","userId":"parent-001","type":"review","appointmentId":"appointment-002","doctorId":"doctor-005","rating":5,"content":"医生沟通耐心，给出的亲子任务非常具体。","createdAt":"2026-05-12T16:20:00.000Z"},
      {"id":"feedback-001","userId":"parent-001","type":"feedback","message":"希望后续增加更多低龄儿童的家庭训练视频。","createdAt":"2026-05-16T10:10:00.000Z"}
    ],
    activities: [
      {"id":"act-001","action":"appointment_created","title":"新增预约订单","detail":"王小川 已预约 韩知夏 2026-05-23 09:00-09:30","createdAt":"2026-05-25T08:33:54.978Z"},
      {"id":"act-002","action":"artwork_uploaded","title":"活动作品上传","detail":"李晓梅 上传了 王梦瑶 的作品《我心中的彩虹》","createdAt":"2026-05-25T07:42:59.476Z"},
      {"id":"act-003","action":"follow_up_submitted","title":"随访反馈提交","detail":"李晓梅 提交了 小红 的随访记录","createdAt":"2026-05-25T07:42:39.956Z"},
      {"id":"act-004","action":"green_channel_applied","title":"绿色通道申请","detail":"李晓梅 为学生 小明 申请专科通道","createdAt":"2026-05-25T07:28:40.183Z"},
      {"id":"act-005","action":"appointment_created","title":"新增预约订单","detail":"王小川 已预约 赵舒宁 2026-05-21 14:00-14:30","createdAt":"2026-05-25T07:27:17.742Z"},
      {"id":"act-006","action":"article_published","title":"发布科普内容","detail":"视频：课堂注意力支持策略 已发布","createdAt":"2026-05-20T07:27:53.526Z"},
      {"id":"act-007","action":"appointment_approved","title":"批准接诊申请","detail":"appointment-005 已审核，状态变为已审核，日期调整为 2026-06-02","createdAt":"2026-05-20T07:22:56.433Z"},
      {"id":"act-008","action":"appointment_approved","title":"批准接诊申请","detail":"appointment-004 已审核，状态变为已审核","createdAt":"2026-05-20T07:22:43.186Z"},
      {"id":"activity-001","action":"appointment_created","title":"新增预约订单","detail":"王乐乐 已预约 赵舒宁 2026-05-21 14:00-14:30","createdAt":"2026-05-18T08:30:00.000Z"},
      {"id":"activity-002","action":"assessment_completed","title":"完成心理测评","detail":"王乐乐 完成 儿童情绪风险快速筛查，结果 高 风险","createdAt":"2026-05-17T15:20:00.000Z"},
      {"id":"activity-003","action":"favorite_added","title":"收藏科普内容","detail":"内容 article-005 已加入收藏","createdAt":"2026-05-18T13:10:00.000Z"},
      {"id":"activity-004","action":"review_created","title":"提交就诊评价","detail":"医生沟通耐心，给出的亲子任务非常具体。","createdAt":"2026-05-12T16:20:00.000Z"}
    ],
    teachers: [
      {"id":"T001","account":"teacher","password":"123456","name":"李晓梅","school":"沈阳市第七中学","title":"心理健康老师","phone":"13800138001","avatar":"","role":"teacher"},
      {"id":"T002","account":"teacher2","password":"123456","name":"王志强","school":"沈阳市实验小学","title":"心理健康老师","phone":"13800138002","avatar":"","role":"teacher"},
      {"id":"T003","account":"teacher3","password":"123456","name":"张慧敏","school":"沈阳市第一高中","title":"心理健康老师","phone":"13800138003","avatar":"","role":"teacher"}
    ],
    greenChannels: [
      {"id":"GC001","teacherId":"T001","teacherName":"李晓梅","school":"沈阳市第七中学","studentName":"小明","studentGrade":"初二","studentGender":"男","problem":"近三个月情绪低落，不愿上学，睡眠质量差，注意力无法集中，家长反映在家也不说话。","contact":"13900139001","status":"待审核","applyTime":"2026-05-18 10:23:00","reviewTime":null,"reviewNote":"","appointmentDate":null,"appointmentTime":null},
      {"id":"GC002","teacherId":"T001","teacherName":"李晓梅","school":"沈阳市第七中学","studentName":"小红","studentGrade":"高一","studentGender":"女","problem":"存在明显焦虑表现，考试前后情绪波动大，有过轻微自伤行为，需要专科评估。","contact":"13900139002","status":"已接受","applyTime":"2026-05-10 09:15:00","reviewTime":"2026-05-11 14:30:00","reviewNote":"情况紧急，安排优先通道","appointmentDate":"2026-05-20","appointmentTime":"上午 09:00-09:30"},
      {"id":"GC003","teacherId":"T002","teacherName":"王志强","school":"沈阳市实验小学","studentName":"小华","studentGrade":"四年级","studentGender":"男","problem":"多动倾向，课堂无法集中注意力，与同学冲突频发，老师和家长均反映问题突出。","contact":"13900139003","status":"待审核","applyTime":"2026-05-19 11:00:00","reviewTime":null,"reviewNote":"","appointmentDate":null,"appointmentTime":null},
      {"id":"GC004","teacherId":"T003","teacherName":"张慧敏","school":"沈阳市第一高中","studentName":"小李","studentGrade":"高三","studentGender":"女","problem":"高考压力导致严重焦虑，出现躯体化症状（头痛、胃痛），影响正常学习生活。","contact":"13900139004","status":"已拒绝","applyTime":"2026-05-08 16:40:00","reviewTime":"2026-05-09 10:00:00","reviewNote":"建议先在校内完成初步干预，一周后如未改善再申请通道","appointmentDate":null,"appointmentTime":null}
    ],
    followUps: [
      {"id":"FU001","teacherId":"T001","teacherName":"李晓梅","school":"沈阳市第七中学","studentName":"小红","studentGrade":"高一","visitDate":"2026-05-20","doctor":"陈思远","diagnosis":"焦虑障碍","followUpDate":"2026-05-21 10:00:00","visitStatus":"按时复诊","emotionStatus":"较就诊前有所好转，情绪稳定性提升","behaviorChange":"自伤行为已消失，与同学交流有所增加","medicationCompliance":"按时服药，无明显副作用","schoolPerformance":"出勤率恢复正常，课堂参与度提升","parentFeedback":"家长反映孩子回家后话明显变多，睡眠改善","teacherSuggestion":"建议继续按医嘱服药，下月进行第二次随访","status":"submitted"},
      {"id":"FU002","teacherId":"T001","teacherName":"李晓梅","school":"沈阳市第七中学","studentName":"小明","studentGrade":"初二","visitDate":"2026-05-15","doctor":"刘心悦","diagnosis":"抑郁倾向","followUpDate":"2026-05-21 14:00:00","visitStatus":"按时复诊","emotionStatus":"情绪仍较低落，但已无明显哭泣行为","behaviorChange":"开始参加部分课外活动","medicationCompliance":"暂未开药，以心理疏导为主","schoolPerformance":"出勤情况改善，但成绩仍有下滑","parentFeedback":"家长积极配合，参加了家庭辅导课程","teacherSuggestion":"持续关注，安排班主任给予更多支持","status":"submitted"},
      {"id":"FU003","teacherId":"T002","teacherName":"王志强","school":"沈阳市实验小学","studentName":"小强","studentGrade":"三年级","visitDate":"2026-05-12","doctor":"赵明辉","diagnosis":"ADHD（注意缺陷多动障碍）","followUpDate":"2026-05-21 16:00:00","visitStatus":"按时复诊","emotionStatus":"情绪较稳定","behaviorChange":"冲动行为有所减少，但仍有注意力分散","medicationCompliance":"已开始服药，家长反映有轻微入睡困难","schoolPerformance":"课堂表现有所改善","parentFeedback":"家长希望了解更多行为训练方法","teacherSuggestion":"建议向医生反馈入睡困难，调整用药时间","status":"submitted"}
    ],
    announcements: [
      {"id":"AN001","type":"training","title":"2026年春季学期心理健康教师专项培训通知","content":"各校心理健康老师：为提升全省中小学心理健康教育工作水平，盛京医院儿童精神心理科联合省教育厅，定于2026年6月10日-12日举办青少年心理危机识别与干预专项培训。培训地点：盛京医院北院区教育中心。培训名额：每校1-2名，请于5月31日前通过本平台报名。联系人：张老师 024-12345678","publisher":"盛京医院儿童心理科","publishTime":"2026-05-15 09:00:00","status":"已发布","readCount":142},
      {"id":"AN002","type":"system","title":"心理老师专区功能上线公告","content":"各位心理健康老师：盛京联盟儿童心理健康服务平台心理老师专区功能正式上线！上线功能包括：专科门诊绿色通道、随访反馈、通知公告、活动作品上传。账号由学校管理员统一开通，如有问题请联系平台客服。","publisher":"系统管理员","publishTime":"2026-05-20 08:00:00","status":"已发布","readCount":89},
      {"id":"AN003","type":"training","title":"第三届青少年心理健康绘画比赛活动通知","content":"各校心理健康老师：盛京医院联合辽宁省教育学会，定于2026年6月1日启动第三届青少年心理健康绘画比赛。活动主题：我心中的彩虹。参赛对象：6-18岁在校学生。投稿截止：2026年6月30日。请通过本平台活动作品上传模块提交。","publisher":"盛京医院儿童心理科","publishTime":"2026-05-18 10:00:00","status":"已发布","readCount":216},
      {"id":"AN004","type":"system","title":"平台维护通知：5月25日凌晨系统升级","content":"平台将于2026年5月25日凌晨00:00-02:00进行系统例行维护升级，维护期间平台暂停服务。给您带来的不便，敬请谅解。","publisher":"系统管理员","publishTime":"2026-05-21 17:00:00","status":"已发布","readCount":53},
      {"id":"AN005","type":"training","title":"家校协作工作坊报名通知（草稿）","content":"培训详情待定，草稿中...","publisher":"盛京医院儿童心理科","publishTime":"2026-05-22 09:00:00","status":"草稿","readCount":0}
    ],
    artworks: [
      {"id":"AW001","teacherId":"T001","teacherName":"李晓梅","school":"沈阳市第七中学","studentName":"王小雨","studentGrade":"初一","studentAge":12,"artworkName":"快乐的星期天","description":"描绘一家人在公园里野餐的温馨场景，色彩明亮，展现出孩子对家庭幸福的向往。","imageUrl":"","submitTime":"2026-05-20 14:30:00","status":"已通过","reviewNote":"色彩运用好，主题积极，推荐参赛"},
      {"id":"AW002","teacherId":"T001","teacherName":"李晓梅","school":"沈阳市第七中学","studentName":"张小浩","studentGrade":"高二","studentAge":16,"artworkName":"心中的彩虹","description":"用超现实主义手法描绘了心灵成长的历程，以彩虹为核心元素，象征希望与未来。","imageUrl":"","submitTime":"2026-05-21 09:15:00","status":"待审核","reviewNote":""},
      {"id":"AW003","teacherId":"T002","teacherName":"王志强","school":"沈阳市实验小学","studentName":"李小朵","studentGrade":"五年级","studentAge":10,"artworkName":"我的好朋友","description":"描绘与小伙伴们一起玩耍的场景，充满童趣，展现儿童友好的社交关系。","imageUrl":"","submitTime":"2026-05-19 16:00:00","status":"已通过","reviewNote":"构图生动，情感真实"},
      {"id":"AW004","teacherId":"T003","teacherName":"张慧敏","school":"沈阳市第一高中","studentName":"赵晓晨","studentGrade":"高三","studentAge":18,"artworkName":"蜕变","description":"以蝴蝶破茧为主题，表达高考前的心理挑战与自我突破，色调深沉中不失希望。","imageUrl":"","submitTime":"2026-05-21 11:45:00","status":"待审核","reviewNote":""},
      {"id":"AW005","teacherId":"T002","teacherName":"王志强","school":"沈阳市实验小学","studentName":"孙小明","studentGrade":"三年级","studentAge":8,"artworkName":"我喜欢上学","description":"描绘了背着书包去上学的自画像，表情开心，展现积极的学习态度。","imageUrl":"","submitTime":"2026-05-21 10:20:00","status":"已拒绝","reviewNote":"图片清晰度不足，请重新扫描上传"},
      {"id":"AW006","teacherId":"T001","teacherName":"李晓梅","school":"沈阳市第七中学","studentName":"王梦瑶","studentGrade":"小学五年级","studentAge":11,"artworkName":"我心中的彩虹","description":"用色彩表达内心的希望与美好，彩虹代表雨后的美好，象征经历困难后终会迎来美好的明天。","imageUrl":"","submitTime":"2026-05-25 07:42:59","status":"待审核","reviewNote":""}
    ]
  };

  // ──────────────────────────────────────────────────────────
  // 2. IN-MEMORY DB (deep copy, supports session-level CRUD)
  // ──────────────────────────────────────────────────────────
  var db = JSON.parse(JSON.stringify(SEED));

  // ──────────────────────────────────────────────────────────
  // 3. HELPERS
  // ──────────────────────────────────────────────────────────
  function nowIso() { return new Date().toISOString(); }
  function makeId() { return 'x' + Math.random().toString(36).slice(2) + Date.now().toString(36); }

  function getAge(birthDate) {
    var b = new Date(birthDate), n = new Date();
    var age = n.getFullYear() - b.getFullYear();
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) age--;
    return Math.max(0, age);
  }
  function getAgeBand(age) {
    if (age < 3) return '0-3岁';
    if (age < 6) return '3-6岁';
    if (age < 13) return '6-12岁';
    return '12岁以上';
  }
  function withHospital(doctor) {
    var h = db.hospitals.find(function (x) { return x.id === doctor.hospitalId; });
    return Object.assign({}, doctor, { hospital: h || { name: '未知医院', address: '', phone: '' } });
  }
  function enrichArticles() {
    var favIds = db.favorites.filter(function (f) { return f.userId === 'parent-001'; }).map(function (f) { return f.articleId; });
    return db.articles.map(function (a) {
      return Object.assign({}, a, {
        isFavorite: favIds.indexOf(a.id) !== -1,
        favoriteCount: db.favorites.filter(function (f) { return f.articleId === a.id; }).length
      });
    });
  }
  function enrichPatient(p) {
    return Object.assign({}, p, { age: getAge(p.birthDate), ageBand: getAgeBand(getAge(p.birthDate)) });
  }
  function enrichAppointments(list) {
    return list.map(function (appt) {
      var doc = db.doctors.find(function (d) { return d.id === appt.doctorId; });
      var pat = db.patients.find(function (p) { return p.id === appt.patientId; });
      var apptDateTime = new Date(appt.date + 'T' + (appt.timeSlot ? appt.timeSlot.split('-')[0] : '00:00') + ':00');
      var canCancel = ['已审核', '待接诊'].includes(appt.status) && (new Date(appt.date).getTime() - Date.now()) > 24 * 3600000;
      return Object.assign({}, appt, {
        doctor: doc ? withHospital(doc) : { name: '未知', hospital: { name: '' } },
        patient: pat ? enrichPatient(pat) : { name: '未知' },
        canCancel: canCancel
      });
    });
  }
  function getDashboardSnapshot() {
    var today = new Date().toISOString().slice(0, 10);
    var cards = {
      todayVisits: db.activities.filter(function (a) { return a.createdAt.startsWith(today); }).length + 86,
      articleReads: db.articles.reduce(function (s, a) { return s + (a.views || 0); }, 0),
      assessmentCount: db.assessments.length,
      appointmentCount: db.appointments.filter(function (a) { return a.status !== '已取消'; }).length
    };
    var trends = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date(); d.setDate(d.getDate() - (6 - i));
      var ds = d.toISOString().slice(0, 10);
      trends.push({ date: ds,
        appointments: db.appointments.filter(function (a) { return a.createdAt.startsWith(ds); }).length,
        assessments: db.assessments.filter(function (a) { return a.createdAt.startsWith(ds); }).length
      });
    }
    var lowSlot = db.schedules.filter(function (s) { return s.availableSlots <= 3 && s.availableSlots > 0; }).length;
    return {
      cards: cards, trends: trends,
      activityFeed: db.activities.slice(0, 20),
      todos: [
        { id: 'todo-1', label: '待发布科普内容 ' + db.articles.filter(function (a) { return a.status !== '已发布'; }).length + ' 条', level: 'warning' },
        { id: 'todo-2', label: '低余量号源 ' + lowSlot + ' 个', level: lowSlot ? 'danger' : 'success' },
        { id: 'todo-3', label: '高风险测评 ' + db.assessments.filter(function (a) { return a.riskLevel === '高'; }).length + ' 条', level: 'danger' }
      ]
    };
  }
  function getAssessmentAnalytics() {
    var byScale = db.scales.map(function (scale) {
      var matched = db.assessments.filter(function (a) { return a.scaleId === scale.id; });
      return { scaleId: scale.id, scaleName: scale.name, total: matched.length,
        high: matched.filter(function (a) { return a.riskLevel === '高'; }).length,
        medium: matched.filter(function (a) { return a.riskLevel === '中'; }).length,
        low: matched.filter(function (a) { return a.riskLevel === '低'; }).length };
    });
    var trends = [];
    for (var i = 0; i < 14; i++) {
      var d = new Date(); d.setDate(d.getDate() - (13 - i));
      var ds = d.toISOString().slice(0, 10);
      trends.push({ date: ds,
        total: db.assessments.filter(function (a) { return a.createdAt.startsWith(ds); }).length,
        high: db.assessments.filter(function (a) { return a.createdAt.startsWith(ds) && a.riskLevel === '高'; }).length
      });
    }
    return {
      overview: { total: db.assessments.length,
        high: db.assessments.filter(function (a) { return a.riskLevel === '高'; }).length,
        medium: db.assessments.filter(function (a) { return a.riskLevel === '中'; }).length,
        low: db.assessments.filter(function (a) { return a.riskLevel === '低'; }).length },
      byScale: byScale, trends: trends,
      highRiskList: db.assessments.filter(function (a) { return a.riskLevel === '高'; })
    };
  }

  // ──────────────────────────────────────────────────────────
  // 4. RESPONSE HELPERS
  // ──────────────────────────────────────────────────────────
  function ok(data, message) {
    return Promise.resolve(new Response(
      JSON.stringify({ code: 200, data: data, message: message || 'success', timestamp: nowIso() }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));
  }
  function fail(status, message) {
    return Promise.resolve(new Response(
      JSON.stringify({ code: status, message: message }),
      { status: status, headers: { 'Content-Type': 'application/json' } }
    ));
  }

  // ──────────────────────────────────────────────────────────
  // 5. ROUTE DISPATCHER
  // ──────────────────────────────────────────────────────────
  function mockApi(url, opts) {
    var method = (opts && opts.method) || 'GET';
    var u = new URL(url, location.href);
    var path = u.pathname;
    var body = {};
    if (opts && opts.body) { try { body = JSON.parse(opts.body); } catch (e) {} }
    var m;

    // ── Bootstrap ──
    if (method === 'GET' && path === '/api/bootstrap') {
      var scope = u.searchParams.get('scope') || 'mobile';
      var enriched = enrichArticles();
      var payload = {
        user: { id: 'parent-001', name: '王晨曦', avatar: 'https://placehold.co/96x96/F4F8FF/165DFF?text=%E5%AE%B6%E9%95%BF', mobile: '138****2698' },
        scope: scope,
        articles: scope === 'admin' ? enriched : enriched.filter(function (a) { return a.status === '已发布'; }),
        doctors: db.doctors.map(withHospital),
        hospitals: db.hospitals,
        scales: db.scales.map(function (s) { return Object.assign({}, s, { questionCount: s.questions.length }); }),
        schedules: db.schedules.map(function (s) { var doc = db.doctors.find(function (d) { return d.id === s.doctorId; }); return Object.assign({}, s, { doctorName: doc ? doc.name : s.doctorId }); }),
        patients: db.patients.map(enrichPatient),
        appointments: enrichAppointments(db.appointments),
        assessments: db.assessments,
        favorites: db.favorites,
        reviews: db.reviews,
        categories: ['情绪', '学习', '亲子', '发育', '睡眠'],
        dashboard: getDashboardSnapshot(),
        assessmentAnalytics: getAssessmentAnalytics(),
        greenChannels: db.greenChannels,
        followUps: db.followUps,
        announcements: db.announcements,
        artworks: db.artworks
      };
      return ok(payload);
    }

    // ── Articles ──
    if (method === 'GET' && path === '/api/articles') {
      var cat = u.searchParams.get('category'), ct = u.searchParams.get('contentType');
      var list = enrichArticles().filter(function (a) { return a.status === '已发布'; });
      if (cat && cat !== '全部') list = list.filter(function (a) { return a.category === cat; });
      if (ct && ct !== '全部') list = list.filter(function (a) { return a.contentType === ct; });
      return ok(list);
    }
    m = path.match(/^\/api\/articles\/([^/]+)$/);
    if (m && method === 'GET') {
      var art = enrichArticles().find(function (a) { return a.id === m[1]; });
      if (!art) return fail(404, '内容不存在');
      var recDocs = db.doctors.filter(function (d) { return d.specialties.some(function (s) { return s.indexOf(art.category) !== -1; }); }).slice(0, 3).map(withHospital);
      return ok(Object.assign({}, art, { recommendedDoctors: recDocs }));
    }

    // ── Doctors ──
    if (method === 'GET' && path === '/api/doctors') { return ok(db.doctors.map(withHospital)); }
    m = path.match(/^\/api\/doctors\/([^/]+)\/availability$/);
    if (m && method === 'GET') {
      return ok(db.schedules.filter(function (s) { return s.doctorId === m[1]; }).sort(function (a, b) { return (a.date + a.timeSlot).localeCompare(b.date + b.timeSlot); }).slice(0, 21));
    }
    m = path.match(/^\/api\/doctors\/([^/]+)$/);
    if (m && method === 'GET') {
      var doc = db.doctors.find(function (d) { return d.id === m[1]; });
      if (!doc) return fail(404, '医生不存在');
      return ok(Object.assign({}, withHospital(doc), { schedules: db.schedules.filter(function (s) { return s.doctorId === doc.id; }) }));
    }

    // ── Scales ──
    if (method === 'GET' && path === '/api/scales') {
      var ab = u.searchParams.get('ageBand'), pt = u.searchParams.get('problemType');
      var sl = db.scales.map(function (s) { return Object.assign({}, s, { questionCount: s.questions.length }); });
      if (ab && ab !== '全部') sl = sl.filter(function (s) { return s.ageBand === ab; });
      if (pt && pt !== '全部') sl = sl.filter(function (s) { return s.problemType === pt; });
      return ok(sl);
    }
    m = path.match(/^\/api\/scales\/([^/]+)$/);
    if (m && method === 'GET') {
      var sc = db.scales.find(function (s) { return s.id === m[1]; });
      return sc ? ok(sc) : fail(404, '量表不存在');
    }

    // ── Assessments ──
    if (method === 'POST' && path === '/api/assessments/submit') {
      var scale = db.scales.find(function (s) { return s.id === body.scaleId; });
      var pat = db.patients.find(function (p) { return p.id === body.patientId; });
      if (!scale || !pat) return fail(400, '量表或就诊人不存在');
      var answers = Array.isArray(body.answers) ? body.answers : [];
      var score = answers.reduce(function (s, a) { return s + Number(a.score || 0); }, 0);
      var maxScore = scale.questions.reduce(function (s, q) { return s + Math.max.apply(null, q.options.map(function (o) { return o.score; })); }, 0);
      var ratio = maxScore ? score / maxScore : 0;
      var risk = ratio >= 0.7 ? '高' : ratio >= 0.4 ? '中' : '低';
      var res = { id: makeId(), scaleId: scale.id, scaleName: scale.name, patientId: pat.id, patientName: pat.name,
        ageBand: scale.ageBand, score: score, maxScore: maxScore, riskLevel: risk,
        suggestion: risk === '高' ? '建议尽快预约儿童心理专科进一步评估。' : risk === '中' ? '建议持续观察，并结合家庭支持干预。' : '当前风险较低，可继续保持规律观察。',
        answers: answers, createdAt: nowIso() };
      db.assessments.unshift(res);
      db.activities.unshift({ id: makeId(), action: 'assessment_completed', title: '完成心理测评', detail: pat.name + ' 完成 ' + scale.name + '，结果 ' + risk + ' 风险', createdAt: nowIso() });
      return ok(res, '提交成功');
    }
    if (method === 'GET' && path === '/api/assessments') { return ok(db.assessments); }

    // ── Patients ──
    if (method === 'GET' && path === '/api/patients') { return ok(db.patients.map(enrichPatient)); }
    if (method === 'POST' && path === '/api/patients') {
      if (db.patients.length >= 5) return fail(400, '最多添加5个就诊人');
      var np = Object.assign({ id: 'patient-' + makeId(), userId: 'parent-001', createdAt: nowIso() }, body);
      db.patients.push(np);
      return ok(enrichPatient(np));
    }
    m = path.match(/^\/api\/patients\/([^/]+)$/);
    if (m && method === 'PUT') {
      var pi = db.patients.findIndex(function (p) { return p.id === m[1]; });
      if (pi === -1) return fail(404, '就诊人不存在');
      db.patients[pi] = Object.assign({}, db.patients[pi], body);
      return ok(enrichPatient(db.patients[pi]));
    }
    m = path.match(/^\/api\/patients\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var pi2 = db.patients.findIndex(function (p) { return p.id === m[1]; });
      if (pi2 === -1) return fail(404, '就诊人不存在');
      db.patients.splice(pi2, 1);
      return ok(null, '已删除');
    }

    // ── Appointments ──
    if (method === 'GET' && path === '/api/appointments') { return ok(enrichAppointments(db.appointments)); }
    if (method === 'POST' && path === '/api/appointments') {
      var docA = db.doctors.find(function (d) { return d.id === body.doctorId; });
      var patA = db.patients.find(function (p) { return p.id === body.patientId; });
      var si = db.schedules.findIndex(function (s) { return s.id === body.scheduleId && s.doctorId === body.doctorId; });
      if (!docA || !patA || si === -1) return fail(400, '预约信息不完整');
      var sch = db.schedules[si];
      if (sch.availableSlots <= 0 || sch.status === '停诊') return fail(400, '该时段号源已满或停诊');
      if (getAge(patA.birthDate) > 18) return fail(400, '仅支持0-18岁儿童预约');
      db.schedules[si] = Object.assign({}, sch, { availableSlots: sch.availableSlots - 1, bookedSlots: sch.bookedSlots + 1 });
      var na = { id: makeId(), userId: 'parent-001', doctorId: docA.id, patientId: patA.id, scheduleId: sch.id,
        date: sch.date, period: sch.period || '上午', hospitalId: docA.hospitalId, status: '待接诊',
        preConsultation: body.preConsultation || {}, createdAt: nowIso() };
      db.appointments.unshift(na);
      db.activities.unshift({ id: makeId(), action: 'appointment_created', title: '新增预约订单', detail: patA.name + ' 已预约 ' + docA.name + ' ' + sch.date + ' ' + sch.timeSlot, createdAt: nowIso() });
      return ok(enrichAppointments([na])[0], '预约成功');
    }
    m = path.match(/^\/api\/appointments\/([^/]+)\/cancel$/);
    if (m && method === 'PUT') {
      var ai = db.appointments.findIndex(function (a) { return a.id === m[1]; });
      if (ai === -1) return fail(404, '预约不存在');
      var appt = db.appointments[ai];
      if (!['已审核', '待接诊'].includes(appt.status)) return fail(400, '当前状态不可取消');
      db.appointments[ai] = Object.assign({}, appt, { status: '已取消', cancelledAt: nowIso() });
      var si2 = db.schedules.findIndex(function (s) { return s.id === appt.scheduleId; });
      if (si2 !== -1) { var s2 = db.schedules[si2]; db.schedules[si2] = Object.assign({}, s2, { availableSlots: s2.availableSlots + 1, bookedSlots: Math.max(0, s2.bookedSlots - 1) }); }
      db.activities.unshift({ id: makeId(), action: 'appointment_cancelled', title: '取消预约订单', detail: appt.id + ' 已取消', createdAt: nowIso() });
      return ok(enrichAppointments([db.appointments[ai]])[0], '取消成功');
    }

    // ── Favorites ──
    if (method === 'GET' && path === '/api/favorites') {
      var fids = db.favorites.filter(function (f) { return f.userId === 'parent-001'; }).map(function (f) { return f.articleId; });
      return ok(enrichArticles().filter(function (a) { return fids.indexOf(a.id) !== -1 && a.status === '已发布'; }));
    }
    if (method === 'POST' && path === '/api/favorites') {
      var aid = body.articleId;
      var ex = db.favorites.find(function (f) { return f.userId === 'parent-001' && f.articleId === aid; });
      var active;
      if (ex) { db.favorites = db.favorites.filter(function (f) { return f.id !== ex.id; }); active = false; }
      else { db.favorites.push({ id: makeId(), userId: 'parent-001', articleId: aid, createdAt: nowIso() }); active = true; }
      return ok({ articleId: aid, active: active }, active ? '收藏成功' : '已取消收藏');
    }

    // ── Reviews ──
    if (method === 'GET' && path === '/api/reviews/pending') {
      var reviewed = db.reviews.filter(function (r) { return r.type === 'review'; }).map(function (r) { return r.appointmentId; });
      return ok(db.appointments.filter(function (a) { return a.status === '已完成' && reviewed.indexOf(a.id) === -1; }));
    }
    if (method === 'GET' && path === '/api/reviews') { return ok(db.reviews); }
    if (method === 'POST' && path === '/api/reviews') {
      var rv = Object.assign({ id: makeId(), userId: 'parent-001', createdAt: nowIso() }, body);
      db.reviews.unshift(rv);
      return ok(rv, '提交成功');
    }

    // ── Admin Dashboard ──
    if (method === 'GET' && path === '/api/admin/dashboard') { return ok(getDashboardSnapshot()); }

    // ── Admin Articles ──
    if (method === 'GET' && path === '/api/admin/articles') { return ok(enrichArticles()); }
    if (method === 'POST' && path === '/api/admin/articles') {
      var na2 = Object.assign({ id: 'article-' + makeId(), status: '待审核', views: 0, publishedAt: '', createdAt: nowIso() }, body);
      db.articles.push(na2);
      return ok(na2);
    }
    m = path.match(/^\/api\/admin\/articles\/([^/]+)\/publish$/);
    if (m && method === 'POST') {
      var ai2 = db.articles.findIndex(function (a) { return a.id === m[1]; });
      if (ai2 === -1) return fail(404, '内容不存在');
      db.articles[ai2] = Object.assign({}, db.articles[ai2], { status: '已发布', publishedAt: nowIso() });
      return ok(db.articles[ai2]);
    }
    m = path.match(/^\/api\/admin\/articles\/([^/]+)$/);
    if (m && method === 'PUT') {
      var ai3 = db.articles.findIndex(function (a) { return a.id === m[1]; });
      if (ai3 === -1) return fail(404, '内容不存在');
      db.articles[ai3] = Object.assign({}, db.articles[ai3], body);
      return ok(db.articles[ai3]);
    }
    m = path.match(/^\/api\/admin\/articles\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var ai4 = db.articles.findIndex(function (a) { return a.id === m[1]; });
      if (ai4 === -1) return fail(404, '内容不存在');
      db.articles.splice(ai4, 1);
      return ok(null, '已删除');
    }

    // ── Admin Doctors ──
    if (method === 'GET' && (path === '/api/admin/doctors' || path === '/api/doctors')) { return ok(db.doctors.map(withHospital)); }
    if (method === 'POST' && path === '/api/admin/doctors') {
      var nd = Object.assign({ id: 'doctor-' + makeId(), createdAt: nowIso() }, body);
      db.doctors.push(nd);
      return ok(withHospital(nd));
    }
    m = path.match(/^\/api\/admin\/doctors\/([^/]+)$/);
    if (m && method === 'PUT') {
      var di = db.doctors.findIndex(function (d) { return d.id === m[1]; });
      if (di === -1) return fail(404, '医生不存在');
      db.doctors[di] = Object.assign({}, db.doctors[di], body);
      return ok(withHospital(db.doctors[di]));
    }
    m = path.match(/^\/api\/admin\/doctors\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var di2 = db.doctors.findIndex(function (d) { return d.id === m[1]; });
      if (di2 === -1) return fail(404, '医生不存在');
      db.doctors.splice(di2, 1);
      return ok(null, '已删除');
    }

    // ── Admin Hospitals ──
    if (method === 'GET' && path === '/api/admin/hospitals') { return ok(db.hospitals); }
    if (method === 'POST' && path === '/api/admin/hospitals') {
      var nh = Object.assign({ id: 'hospital-' + makeId() }, body);
      db.hospitals.push(nh);
      return ok(nh);
    }
    m = path.match(/^\/api\/admin\/hospitals\/([^/]+)$/);
    if (m && method === 'PUT') {
      var hi = db.hospitals.findIndex(function (h) { return h.id === m[1]; });
      if (hi === -1) return fail(404, '医院不存在');
      db.hospitals[hi] = Object.assign({}, db.hospitals[hi], body);
      return ok(db.hospitals[hi]);
    }
    m = path.match(/^\/api\/admin\/hospitals\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var hi2 = db.hospitals.findIndex(function (h) { return h.id === m[1]; });
      if (hi2 === -1) return fail(404, '医院不存在');
      db.hospitals.splice(hi2, 1);
      return ok(null, '已删除');
    }

    // ── Admin Schedules ──
    if (method === 'GET' && path === '/api/admin/schedules') {
      return ok(db.schedules.map(function (s) { var doc = db.doctors.find(function (d) { return d.id === s.doctorId; }); return Object.assign({}, s, { doctorName: doc ? doc.name : s.doctorId }); }));
    }
    if (method === 'POST' && path === '/api/admin/schedules') {
      var ns = Object.assign({ id: 'schedule-' + makeId() }, body, { availableSlots: (body.totalSlots || 0) - (body.bookedSlots || 0) });
      db.schedules.push(ns);
      return ok(ns);
    }
    m = path.match(/^\/api\/admin\/schedules\/([^/]+)$/);
    if (m && method === 'PUT') {
      var sci = db.schedules.findIndex(function (s) { return s.id === m[1]; });
      if (sci === -1) return fail(404, '排班不存在');
      var upd = Object.assign({}, db.schedules[sci], body);
      upd.availableSlots = upd.totalSlots - upd.bookedSlots;
      db.schedules[sci] = upd;
      return ok(upd);
    }

    // ── Admin Appointments ──
    if (method === 'GET' && path === '/api/admin/appointments') { return ok(enrichAppointments(db.appointments)); }
    if (method === 'GET' && path === '/api/admin/appointments/export') {
      var rows = ['\uFEFF订单ID,状态,日期,时段,医生,医院,儿童'];
      enrichAppointments(db.appointments).forEach(function (a) {
        rows.push([a.id, a.status, a.date, a.timeSlot, a.doctor.name, a.doctor.hospital.name, a.patient.name].join(','));
      });
      return Promise.resolve(new Response(rows.join('\n'), { status: 200, headers: { 'Content-Type': 'text/csv;charset=utf-8' } }));
    }

    // ── Admin Assessments ──
    if (method === 'GET' && path === '/api/admin/assessments') { return ok(getAssessmentAnalytics()); }

    // ── Admin Login ──
    if (method === 'POST' && path === '/api/admin/login') {
      if (!body.password) return fail(400, '请输入密码');
      var adminAccounts = [
        { id: 'AU001', account: 'admin',    password: '123456', role: 'admin',    institutionId: 'hospital-001',    institutionName: '盛京医院（主院）',   name: '管理员' },
        { id: 'AU002', account: 'alliance', password: '123456', role: 'alliance', institutionId: 'hospital-dalian', institutionName: '大连市儿童医院心理科', name: '联盟管理员' }
      ];
      var matched = adminAccounts.find(function(u) { return u.account === body.account && u.password === body.password; });
      if (!matched) return fail(401, '账号或密码错误，演示账号 admin 或 alliance / 密码 123456');
      return ok(matched, '登录成功');
    }

    // ── Admin Article actions ──
    m = path.match(/^\/api\/admin\/articles\/([^/]+)\/publish$/);
    if (m && method === 'POST') {
      var aidx = db.articles.findIndex(function (a) { return a.id === m[1]; });
      if (aidx === -1) return fail(404, '内容不存在');
      db.articles[aidx] = Object.assign({}, db.articles[aidx], { status: '已发布', publishedAt: nowIso() });
      return ok(db.articles[aidx], '已发布');
    }
    m = path.match(/^\/api\/admin\/articles\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var aidx2 = db.articles.findIndex(function (a) { return a.id === m[1]; });
      if (aidx2 === -1) return fail(404, '内容不存在');
      db.articles.splice(aidx2, 1);
      return ok(null, '已删除');
    }

    // ── Admin Doctor/Hospital delete ──
    m = path.match(/^\/api\/admin\/doctors\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var didx = db.doctors.findIndex(function (d) { return d.id === m[1]; });
      if (didx === -1) return fail(404, '医生不存在');
      db.doctors.splice(didx, 1);
      return ok(null, '已删除');
    }
    m = path.match(/^\/api\/admin\/hospitals\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var hidx = db.hospitals.findIndex(function (h) { return h.id === m[1]; });
      if (hidx === -1) return fail(404, '医院不存在');
      db.hospitals.splice(hidx, 1);
      return ok(null, '已删除');
    }

    // ── Admin Appointment review ──
    m = path.match(/^\/api\/admin\/appointments\/([^/]+)\/review$/);
    if (m && method === 'PUT') {
      var aridx = db.appointments.findIndex(function (a) { return a.id === m[1]; });
      if (aridx === -1) return fail(404, '预约不存在');
      db.appointments[aridx] = Object.assign({}, db.appointments[aridx], { status: body.action === 'approve' ? '已审核' : '已拒绝', reviewNote: body.note || '' });
      return ok(enrichAppointments([db.appointments[aridx]])[0], '审核完成');
    }

    // ── Mobile Appointment confirm ──
    m = path.match(/^\/api\/appointments\/([^/]+)\/confirm$/);
    if (m && method === 'PUT') {
      var acidx = db.appointments.findIndex(function (a) { return a.id === m[1]; });
      if (acidx === -1) return fail(404, '预约不存在');
      db.appointments[acidx] = Object.assign({}, db.appointments[acidx], { status: body.confirmed ? '已审核' : '已拒绝' });
      return ok(enrichAppointments([db.appointments[acidx]])[0], '操作成功');
    }

    // ── Admin Green Channels ──
    if (method === 'GET' && path === '/api/admin/green-channels') { return ok(db.greenChannels); }
    m = path.match(/^\/api\/admin\/green-channels\/([^/]+)\/review$/);
    if (m && method === 'PUT') {
      var gcidx = db.greenChannels.findIndex(function (g) { return g.id === m[1]; });
      if (gcidx === -1) return fail(404, '记录不存在');
      db.greenChannels[gcidx] = Object.assign({}, db.greenChannels[gcidx], { status: body.action === 'approve' ? '已接受' : '已拒绝', reviewNote: body.note || '', reviewedAt: nowIso() });
      return ok(db.greenChannels[gcidx], '审核完成');
    }

    // ── Admin Follow-ups ──
    if (method === 'GET' && path === '/api/admin/follow-ups') { return ok(db.followUps); }

    // ── Admin Announcements ──
    if (method === 'GET' && path === '/api/admin/announcements') { return ok(db.announcements); }
    m = path.match(/^\/api\/admin\/announcements\/([^/]+)\/publish$/);
    if (m && method === 'POST') {
      var annidx = db.announcements.findIndex(function (a) { return a.id === m[1]; });
      if (annidx === -1) return fail(404, '公告不存在');
      db.announcements[annidx] = Object.assign({}, db.announcements[annidx], { status: '已发布', publishedAt: nowIso() });
      return ok(db.announcements[annidx], '已发布');
    }
    m = path.match(/^\/api\/admin\/announcements\/([^/]+)\/unpublish$/);
    if (m && method === 'POST') {
      var annidx2 = db.announcements.findIndex(function (a) { return a.id === m[1]; });
      if (annidx2 === -1) return fail(404, '公告不存在');
      db.announcements[annidx2] = Object.assign({}, db.announcements[annidx2], { status: '草稿', publishedAt: '' });
      return ok(db.announcements[annidx2], '已下架');
    }
    m = path.match(/^\/api\/admin\/announcements\/([^/]+)$/);
    if (m && method === 'DELETE') {
      var annidx3 = db.announcements.findIndex(function (a) { return a.id === m[1]; });
      if (annidx3 === -1) return fail(404, '公告不存在');
      db.announcements.splice(annidx3, 1);
      return ok(null, '已删除');
    }

    // ── Admin Artworks ──
    if (method === 'GET' && path === '/api/admin/artworks') { return ok(db.artworks); }
    m = path.match(/^\/api\/admin\/artworks\/([^/]+)\/review$/);
    if (m && method === 'PUT') {
      var awidx = db.artworks.findIndex(function (a) { return a.id === m[1]; });
      if (awidx === -1) return fail(404, '作品不存在');
      db.artworks[awidx] = Object.assign({}, db.artworks[awidx], { status: body.action === 'approve' ? '已通过' : '已拒绝', reviewNote: body.note || '', reviewedAt: nowIso() });
      return ok(db.artworks[awidx], '审核完成');
    }

    // ── Teacher Login ──
    if (method === 'POST' && path === '/api/teacher/login') {
      var tc = db.teachers.find(function (t) { return t.account === body.account && t.password === body.password; });
      if (!tc) return fail(401, '账号或密码错误，演示账号 teacher / 密码 123456');
      return ok(tc, '登录成功');
    }

    // ── Teacher Green Channels ──
    if (method === 'GET' && path === '/api/teacher/green-channels') {
      var tcid = u.searchParams.get('teacherId');
      return ok(db.greenChannels.filter(function (g) { return !tcid || g.teacherId === tcid; }));
    }
    if (method === 'POST' && path === '/api/teacher/green-channels') {
      var ngc = Object.assign({ id: 'gc-' + makeId(), status: '待审核', createdAt: nowIso() }, body);
      db.greenChannels.unshift(ngc);
      return ok(ngc, '提交成功');
    }

    // ── Teacher Follow-ups ──
    if (method === 'GET' && path === '/api/teacher/follow-ups') {
      var fuid = u.searchParams.get('teacherId');
      return ok(db.followUps.filter(function (f) { return !fuid || f.teacherId === fuid; }));
    }
    if (method === 'POST' && path === '/api/teacher/follow-ups') {
      var nfu = Object.assign({ id: 'fu-' + makeId(), createdAt: nowIso() }, body);
      db.followUps.unshift(nfu);
      return ok(nfu, '提交成功');
    }

    // ── Teacher Announcements ──
    if (method === 'GET' && path === '/api/teacher/announcements') {
      return ok(db.announcements.filter(function (a) { return a.status === '已发布'; }));
    }

    // ── Teacher Artworks ──
    if (method === 'GET' && path === '/api/teacher/artworks') {
      var awuid = u.searchParams.get('teacherId');
      return ok(db.artworks.filter(function (a) { return !awuid || a.teacherId === awuid; }));
    }
    if (method === 'POST' && path === '/api/teacher/artworks') {
      var naw = Object.assign({ id: 'aw-' + makeId(), status: '待审核', createdAt: nowIso() }, body);
      db.artworks.unshift(naw);
      return ok(naw, '提交成功');
    }

    return fail(404, 'Mock: 未找到接口 ' + path);
  }

  // ──────────────────────────────────────────────────────────
  // 6. INTERCEPT window.fetch
  // ──────────────────────────────────────────────────────────
  var _realFetch = window.fetch;
  window.fetch = function (url, opts) {
    if (typeof url === 'string' && url.indexOf('/api/') !== -1) {
      return mockApi(url, opts);
    }
    return _realFetch.apply(this, arguments);
  };

  // Silence WebSocket connection errors (no server on GitHub Pages)
  var _OrigWS = window.WebSocket;
  window.WebSocket = function (url, protocols) {
    var ws;
    try { ws = protocols ? new _OrigWS(url, protocols) : new _OrigWS(url); } catch (e) { ws = {}; }
    // Swallow error/close events so the app doesn't show console errors
    var noop = function () {};
    ws.addEventListener = ws.addEventListener || noop;
    return ws;
  };
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;

})();
