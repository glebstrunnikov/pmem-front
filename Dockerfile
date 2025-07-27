# 1️⃣ Build stage
FROM node:20 AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the Nuxt app
RUN npm run build

# 2️⃣ Run stage (lighter image)
FROM node:20

WORKDIR /app

# Copy only the built app from builder stage
COPY --from=builder /app/.output ./.output
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
