pipeline {
    agent { label 'agent-01' }

    environment {
        APP_DIR = "/home/ubuntu/app"
        DATA_DIR = "/home/ubuntu/data"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/SachinRao033/Full-Stack-Deployment.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh '''
                set -e

                echo "Installing Backend..."
                cd backend
                npm install

                echo "Installing Frontend..."
                cd ../frontend
                npm install

                echo "Building Frontend..."
                npm run build
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                echo "Cleaning backend..."
                rm -rf $APP_DIR/*
                mkdir -p $APP_DIR

                echo "Copying backend..."
                cp -r backend/* $APP_DIR/

                echo "Handling DB..."
                if [ ! -f $DATA_DIR/contacts.db ]; then
                    cp backend/contacts.db $DATA_DIR/
                else
                    echo "DB exists, skipping"
                fi
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                echo "Deploying frontend..."
                rm -rf /var/www/html/*
                cp -r frontend/build/* /var/www/html/
                '''
            }
        }

        stage('Start Backend') {
            steps {
                sh '''
                cd $APP_DIR

                echo "Starting backend..."

                if pm2 list | grep -q backend; then
                    pm2 restart backend
                else
                    pm2 start index.js --name backend
                fi

                pm2 save --force
                '''
            }
        }
    }
}
