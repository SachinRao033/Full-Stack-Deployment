pipeline {
    agent { label 'linux' }

    environment {
        APP_DIR = "/home/ubuntu/app"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/SachinRao033/Full-Stack-Deployment.git'
            }
        }

        stage('Install Backend') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Install Frontend') {
            steps {
                sh 'cd frontend && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r frontend/build/* /var/www/html/
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                mkdir -p $APP_DIR
                cp -r backend/* $APP_DIR/
                '''
            }
        }

        stage('Start Backend') {
            steps {
                sh '''
                cd $APP_DIR
                pm2 delete all || true
                pm2 start index.js
                '''
            }
        }
    }
}
