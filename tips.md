get the IP from a container :
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' containerID 