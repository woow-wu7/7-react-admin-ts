FROM node

MAINTAINER  woow.wu7<woow.wu7@gmail.com>

LABEL name='woow_wu7'

ENV  WORKPATH /

WORKDIR $WORKPATH

RUN mkdir /build

CMD /bin/bash
