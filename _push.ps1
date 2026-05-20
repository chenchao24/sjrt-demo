<#
  _push.ps1 — 上传 docs/ 目录到 GitHub (chenchao24/sjrt)
  使用 GitHub Contents API + 企业代理，无需 git

  用法:
    .\_push.ps1 -Token ghp_xxxxxxxxxxxxxxxxxxxx

  前置条件:
    1. 在 https://github.com/new 创建空仓库 "sjrt"（不初始化 README）
    2. 在 https://github.com/settings/tokens 生成 PAT（Classic，勾选 repo 权限）
    3. 运行本脚本后，在 GitHub 仓库 Settings → Pages 中选择 main 分支 /docs 目录
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$Token
)

$owner   = "chenchao24"
$repo    = "sjrt-demo"
$srcRoot = "C:\Users\Administrator\Desktop\SJRT\docs"
$apiBase = "https://api.github.com/repos/$owner/$repo/contents"
$proxy   = "http://proxy.neusoft.com:8080"
$headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github.v3+json"
    "User-Agent"    = "SJRT-Uploader/1.0"
}

# 获取文件在 GitHub 已有的 SHA（用于更新已存在的文件）
function Get-FileSha($apiUrl) {
    try {
        $resp = Invoke-WebRequest -Uri $apiUrl -Method GET -Headers $headers `
            -Proxy $proxy -UseBasicParsing -ErrorAction Stop
        ($resp.Content | ConvertFrom-Json).sha
    } catch { $null }
}

$files = Get-ChildItem -Path $srcRoot -Recurse -File | Sort-Object FullName
$total = $files.Count
$i = 0
$ok = 0
$fail = 0

Write-Host ""
Write-Host "===== 盛京儿童心理健康平台 — GitHub 上传脚本 ====="
Write-Host "仓库：$owner/$repo   文件数：$total"
Write-Host ""

foreach ($f in $files) {
    $i++
    $rel    = $f.FullName.Substring($srcRoot.Length).TrimStart('\').Replace('\', '/')
    $dest   = "docs/$rel"
    $uri    = "$apiBase/$dest"
    $bytes  = [System.IO.File]::ReadAllBytes($f.FullName)
    $b64    = [Convert]::ToBase64String($bytes)

    # 检查远端是否已存在该文件（支持重复运行）
    $sha = Get-FileSha $uri
    $bodyHash = @{ message = "Upload $dest"; content = $b64 }
    if ($sha) { $bodyHash.sha = $sha }
    $body = $bodyHash | ConvertTo-Json -Depth 2

    Write-Host "[$i/$total] $dest" -NoNewline
    try {
        Invoke-WebRequest -Uri $uri -Method PUT -Headers $headers -Body $body `
            -ContentType "application/json" -Proxy $proxy -UseBasicParsing -ErrorAction Stop | Out-Null
        Write-Host "  OK" -ForegroundColor Green
        $ok++
    } catch {
        Write-Host "  FAIL: $_" -ForegroundColor Red
        $fail++
    }
}

Write-Host ""
Write-Host "===== 完成：$ok 成功，$fail 失败 ====="
Write-Host ""
Write-Host "下一步（启用 GitHub Pages）— 在 PowerShell 中执行:"
Write-Host ""
Write-Host '$token = "' + $Token.Substring(0, [Math]::Min(8, $Token.Length)) + '..."  # 替换为完整 Token'
Write-Host '$body  = ''{"source":{"branch":"main","path":"/docs"}}'''
Write-Host 'Invoke-WebRequest -Uri "https://api.github.com/repos/' + $owner + '/' + $repo + '/pages" \'
Write-Host '  -Method POST -Headers @{"Authorization"="token $token";"Accept"="application/vnd.github.v3+json";"User-Agent"="SJRT-Uploader"} \'
Write-Host '  -Body $body -ContentType "application/json" -Proxy "http://proxy.neusoft.com:8080" -UseBasicParsing'
Write-Host ""
Write-Host "Pages 启用后，演示地址（约 2 分钟生效）："
Write-Host "  https://$owner.github.io/$repo/"
Write-Host "  家长端：https://$owner.github.io/$repo/mobile/"
Write-Host "  管理端：https://$owner.github.io/$repo/admin/"
Write-Host ""
Write-Host "完成后请在 https://github.com/settings/tokens 撤销本次使用的 PAT。"
