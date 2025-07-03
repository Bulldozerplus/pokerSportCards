# Этап 1: Сборка приложения
FROM node:18 AS build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные исходники
COPY . .

# Собираем приложение
RUN npm run build

# Этап 2: Сервер для статики (nginx)
FROM nginx

# Копируем собранные файлы Angular в папку nginx
COPY --from=build /app/dist/poker-sport-card/browser /usr/share/nginx/html

# Копируем кастомный конфиг nginx (опционально)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
