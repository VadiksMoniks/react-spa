# React SPA + Laravel API

Project contains of two parts:
- Backend on Laravel 10 (PHP 8.2.12) with API and authentication via Sanctum
- Frontend on React 18.2.0 via Node.js 20.11 & npm

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
    if you use not MySQL ```DB_CONNECTION=mysql``` to your db for example ```DB_CONNECTION=sqlite``
6. Add after ```APP_URL``` nex Constant ```FRONTEND_URL=http://localhost:5173```
7. run commands:
     ```php artisan key:generate
     php artisan migrate --seed
     php artisan serve``` (or use localserver such as XAMPP/MAMP etc.), I'm using XAMPP

### Frontend (React)

1. Go to frontend folder
2. Run command ```npm install```
3. Run command ```npm run dev```
4. Copy link from console (http://localhost:5173/) and open it in your browser


### !Note
If you install this project not in the root of the web server, but in a subfolder (for example, test-spa) you should add your subfolder's name to path like this baseURL: 'http://localhost/your_root_folder_name/react-spa/backend/public/api' on lines 4 and 13 in `frontend/src/api/axios.js`
If not just skip this






