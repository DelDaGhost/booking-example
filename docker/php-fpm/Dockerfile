# Use PHP 8.1 FPM image
FROM php:8.1-fpm

# Install dependencies for PostgreSQL and other PHP extensions
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql pgsql

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /var/www

# Copy your application code into the container (this will be done in the docker-compose.yml volume)
