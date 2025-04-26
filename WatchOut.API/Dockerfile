#parent image
FROM golang:1.23.3

#creates a directory
WORKDIR /app

#move all source code to the directory
COPY . .

#install dependencies
RUN go mod download

#build code
RUN go build -o /server

#sets port to listen 
EXPOSE 3000

#tell which executable 
CMD ["/server"]
