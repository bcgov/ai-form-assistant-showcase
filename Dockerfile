# Stage 1: Build frontend
FROM node:20-alpine AS build
WORKDIR /app

# Install frontend deps and build (now under app/frontend)
COPY app/frontend/package*.json ./app/frontend/
RUN npm --prefix app/frontend ci
COPY app/frontend ./app/frontend
RUN npm --prefix app/frontend run build

# Stage 2: Runtime server (now under app)
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install server deps
COPY app/package*.json ./app/
RUN npm --prefix app ci --only=production

# Copy server and built assets
COPY app/server.js ./app/
COPY --from=build /app/app/frontend/dist ./app/public

EXPOSE 8080
CMD ["node", "app/server.js"]
