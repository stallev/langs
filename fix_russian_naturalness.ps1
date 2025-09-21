# PowerShell скрипт для исправления неестественных конструкций в русских файлах
# Применяет правила естественного русского языка

$files = Get-ChildItem -Path "*.md" -File

foreach ($file in $files) {
    Write-Host "Обрабатываю файл: $($file.Name)"
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Правило 1: Прилагательное + Существительное (исправляем порядок)
    $content = $content -replace '(\w+) (\w+) и (\w+) (\w+)', '$1 $2 $3 $4'
    
    # Правило 2: Естественные конструкции
    $content = $content -replace '(\w+) (\w+)\.', '$1 $2.'
    
    # Правило 3: Порядок в предложениях с болью
    $content = $content -replace '(\w+) болит\.', 'Болит $1.'
    
    # Правило 4: Множественные прилагательные без "и"
    $content = $content -replace '(\w+) и (\w+) (\w+)', '$1 $2 $3'
    
    # Правило 5: Естественные определения
    $content = $content -replace '(\w+) (\w+) и (\w+)', '$1 $2 $3'
    
    # Специфические исправления
    $content = $content -replace 'Черные и кожаные ботинки', 'Черные кожаные ботинки'
    $content = $content -replace 'Теплое и серое пальто', 'Теплое серое пальто'
    $content = $content -replace 'Большая и удобная сумка', 'Большая удобная сумка'
    $content = $content -replace 'Голова болит', 'Болит голова'
    $content = $content -replace 'Зуб болит', 'Болит зуб'
    $content = $content -replace 'Спина болит', 'Болит спина'
    $content = $content -replace 'Живот болит', 'Болит живот'
    
    # Исправления в примерах
    $content = $content -replace '"(\w+) (\w+) и (\w+) (\w+)"', '"$1 $2 $3 $4"'
    $content = $content -replace '"(\w+) (\w+)\."', '"$1 $2."'
    
    # Исправления в практических фразах
    $content = $content -replace '- "(\w+) (\w+) и (\w+) (\w+)"', '- "$1 $2 $3 $4"'
    $content = $content -replace '- "(\w+) (\w+)\."', '- "$1 $2."'
    
    # Сохраняем файл
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Файл $($file.Name) обработан"
}

Write-Host "Все файлы обработаны!"
