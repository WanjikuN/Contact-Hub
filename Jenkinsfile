pipeline {
    agent any
  
    environment {
        PIPENV_VENV_IN_PROJECT = '1'
        gitRepoUrl = 'https://github.com/WanjikuN/Contact-Hub/tree/feat-hosting'
        renderServiceName = 'https://contact-hub-jrd9.onrender.com'
        renderToken = credentials('render-token-id')
        
    }
    stages {
        stage('Clone repository') {
            steps {
                git gitRepoUrl
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'pipenv install'
            }
        }
       stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    
                    sh 'pip install pipenv'

                    
                    sh 'pipenv install --dev'

                   
                }
            }
        }
        stage('Deploy to Render') {
            steps {
                script {
                    def renderDeployCommand = """
                        curl -X POST -H "Authorization: Bearer ${renderToken}" \
                        -H "Content-Type: application/json" \
                        -d '{"branch": "master", "commit": "HEAD"}' \
                        https://api.render.com/v1/services/${renderServiceName}/deploy
                    """
                    sh renderDeployCommand
                }
            }
        }
        
    }
}
