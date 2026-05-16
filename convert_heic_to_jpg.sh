#!/bin/bash

# Скрипт для конвертування HEIC → JPEG
# Використання: bash convert_heic_to_jpg.sh

PHOTO_DIR="image/photo/result"

if [ ! -d "$PHOTO_DIR" ]; then
    echo "❌ Папка $PHOTO_DIR не знайдена!"
    exit 1
fi

echo "🔄 Конвертування HEIC → JPEG..."
echo "📁 Папка: $PHOTO_DIR"
echo ""

cd "$PHOTO_DIR" || exit

converted=0
failed=0

for file in *.HEIC; do
    if [ -f "$file" ]; then
        output="${file%.*}.jpg"
        
        echo "⏳ Конвертую: $file → $output"
        
        if sips -s format jpeg "$file" --out "$output" 2>/dev/null; then
            echo "✅ Готово: $output"
            rm "$file"
            echo "🗑️ Видалено оригінал: $file"
            ((converted++))
        else
            echo "❌ Помилка при конвертуванні: $file"
            ((failed++))
        fi
    fi
done

echo ""
echo "================================"
echo "✅ Конвертовано: $converted файлів"
echo "❌ Помилок: $failed"
echo "================================"

if [ $converted -gt 0 ]; then
    echo "🎉 Конвертування завершено!"
else
    echo "⚠️  HEIC файли не знайдені."
fi
