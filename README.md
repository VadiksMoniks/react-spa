# React SPA + Laravel API

Проект состоит из двух частей:
- Backend на Laravel 10 (PHP 8.2.12) с API и аутентификацией через Sanctum
- Frontend на React 18.2.0 с использованием Node.js 20.11 и npm

---

## Requirements

- PHP 8.2.12+
- Composer
- Node.js 20.11+
- npm
- MySQL or other database compatible with Laravel

---

## Installation

### Backend (Laravel)

1. Go to backend folder
2. Run command ```composer install``` in terminal
3. Rename `.env.example` or copy it to `.env`
4. Rename in `.env` next Constants:
   ```DB_DATABASE=laravel``` to your db name for example ```DB_DATABASE=spa```
5. Add after ```APP_URL``` nex Constant ```FRONTEND_URL=http://localhost:5173```
6. run commands:
     ```php artisan key:generate
     php artisan migrate --seed
     php artisan serve``` (or use localserver such as XAMPP/MAMP etc.)

### Frontend (React)

1. Go to frontend folder
2. Run command ```npm install```
3. Run command ```npm run dev```
4. Copy link from console (http://localhost:5173/) and open it in your browser


