# Professional AI/ML Portfolio

This is a premium, glassmorphism-styled portfolio website built with **Flask** to showcase Machine Learning projects.

## Project Structure
- `app.py`: Main Flask application.
- `templates/`: HTML files (`index.html`, `projects.html`, `base.html`).
- `static/css/`: Styling with modern glassmorphism effects.
- `static/js/`: Interactivity and smooth scrolling.

## Local Development

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Application**:
   ```bash
   python app.py
   ```
   The site will be available at `http://127.0.0.1:5000`.

## Deployment (Free Hosting on Render)

To host this website for free, I recommend using **Render**.

1. **Push to GitHub**:
   - Create a new repository on GitHub.
   - Push all files in `Colab Notebooks/Portfolio` to that repository.
     ```bash
     cd "c:\Data Backup 13-6-25\Desktop\Colab Notebooks-20250518T043052Z-1-001\Colab Notebooks\Portfolio"
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin <YOUR_GITHUB_REPO_URL>
     git push -u origin main
     ```

2. **Deploy on Render**:
   - Go to [Render.com](https://render.com) and sign up/login.
   - Click "New +" and select "Web Service".
   - Connect your GitHub account and select your new repository.
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - Click "Create Web Service".

Your portfolio will be live in minutes!
