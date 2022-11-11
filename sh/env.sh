# Config app environment variable
export NODE_ENV=development
export PORT=8888


# URL of the Mongo DB
# export MONGODB_URL="mongodb://127.0.0.1:27017/node-boilerplate"
# export MONGODB_URL="mongodb+srv://miniSocialNetwork:miniSocialNetwork@cluster0.3rkpg.mongodb.net/mini-social-network?retryWrites=true&w=majority"
export MONGODB_URL="mongodb+srv://mern-social-network:mern-social-network@cluster0.7cdm8.mongodb.net/mern-social-network?retryWrites=true&w=majority"


# JWT
# JWT secret key
export JWT_ACCESS_SECRET=access_secret
export JWT_REFRESH_SECRET=refresh_secret
export JWT_ACTIVATE_SECRET=activate_secret
export JWT_RESET_PASSWORD_SECRET=reset_pass_secret

# JWT expirations
export JWT_ACCESS_EXPIRATION=5days
export JWT_REFRESH_EXPIRATION=30days
export JWT_RESET_PASSWORD_EXPIRATION=10m
export JWT_ACTIVATE_EXPIRATION=5m


# CLOUDINARY
export CLOUD_NAME=dvnmolznq
export CLOUD_API_KEY=974881534354895
export CLOUD_API_SECRET=PfIbFwRWDOiNlDd_E_XENdKyNsA

# SMTP configuration options for the email service
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=minh.mchiu@gmail.com
export SMTP_PASSWORD=mphkvglrdlylboiu
export EMAIL_FROM=minh.mchiu

# OAuth client
export OAUTH_CLIENT_ID=679275323194-0m8bkvm059v14kcepq57l873v8lm7r37.apps.googleusercontent.com
export OAUTH_CLIENT_SECRET=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
