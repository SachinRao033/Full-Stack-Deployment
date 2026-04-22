pipeline {
    agent { label 'agent-01' }

    environment {
        APP_DIR = "/home/jenkins/app"
    }

    stages {

        stage('Clean') {
            steps {
                sh 'rm -rf $APP_DIR || true'
            }
        }

        stage('Clone Repo') {
            steps {
                git 'https://github.com/SachinRao033/Full-Stack-Deployment.git'
            }
        }

        stage('Copy Files') {
            steps {
                sh '''
                mkdir -p $APP_DIR
                cp -r * $APP_DIR
                '''
            }
        }

        stage('Install Backend') {
            steps {
                dir("$APP_DIR/backend") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("$APP_DIR/frontend") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Start Services') {
            steps {
                sh '''
                sudo systemctl restart myapp
                sudo systemctl reload nginx
                '''
            }
        }
    }
}
