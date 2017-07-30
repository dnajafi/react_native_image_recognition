# Backend for ImageClassifier react-native app

#### Images are uploaded to an S3 bucket which then triggers a lamba function
#### The lambda function will then make a call to the AWS Rekognition service to detect various object in the image
#### Metadata for the image including the S3 bucket, image name, and possible objects in the image is uploaded to DynamoDB

#### Allows for local-strategy authentication, facebook oauth authentication, google+ oauth authentication.

#### Authentication tokens are used to access some of the secure api routes

#### User data for registration and authentication is stored in MongoDB

