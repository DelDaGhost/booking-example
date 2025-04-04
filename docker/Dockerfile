# Use PHP 8.1 FPM image
FROM php:8.1-fpm

# Install dependencies and Composer
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /var/www

# Copy your application code into the container (this will be done in the docker-compose.yml volume)
