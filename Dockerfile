FROM ubuntu:18.10

RUN apt update -qyy
RUN apt install -y xterm git nodejs npm
RUN apt install -y libgtk2.0-0
RUN apt install -y libsm6
RUN apt install -y libc6
RUN apt install -y libnss3
RUN apt install -y libgtk-3-dev
RUN apt install -y libxss-dev
RUN apt install -y libasound2

ENTRYPOINT ["/bin/bash"]
