##### Docker

- [Link](https://juejin.cn/post/6844904099024994312)

##### (1) Install

```
(一)
The process of installing Docker


(1) 如果安装过Docker，先卸载 docker 或者 docker-engine 以及相关的依赖
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine


(2) 安装Docker需要的相关插件
- yum-utils
- device-mapper-persistent-data
- lvm2
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2


(3) 设置稳定的存储库 - 仓库
- 官方仓库
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
- 阿里云仓库：如果安装太慢，用阿里云镜像
$ sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo


(4) 启用存储库（可选）
$ sudo yum-config-manager --enable docker-ce-nightly


(5) 安装最新版本的Docker Engine-Community和containerd
$ sudo yum install docker-ce docker-ce-cli  containerd.io
    - 1. 查询可用版本：
        - yum list docker-ce--show duplicates| sort-r
    - 2. 安装指定版本
        - $ sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
        - $ sudo yum install docker-ce-[第一步查出来的版本号] docker-ce-cli-[在使用1中的查询查出cli的版本] containerd.io


(6) 启动 - 安装完成后
$ sudo systemctl start docker


(7) 设置国内镜像仓库，这个和(第三步)不冲突
- /var/lib/docker/
- Images, containers, volumes, and networks stored in /var/lib/docker/
- aren't automatically removed when you uninstall Docker.
---
具体步骤如下:
vi /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://dockerproxy.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://docker.nju.edu.cn"
  ]
}
sudo systemctl daemon-reload
sudo systemctl restart docker


(8) 验证 hello-world
$ sudo docker run hello-world
```

##### (2) Deploy Vue Project

- [Link](https://juejin.cn/post/6844904099024994312)

```111111111
(1) Example One
--
docker run -d --name=nginx-8080 -p 8080:80 \
  -v /home/workspace/nginx/conf.d:/etc/nginx/conf.d \
  -v /home/workspace/nginx/html.d:/usr/share/nginx/html \
  6678c7c2e56c

docker run -d --name=nginx-8-divine-plus -p 8080:80 \
-v /root/work/front-end/docker/8-divine-plus/conf.d:/etc/nginx/conf.d \
-v /root/work/front-end/docker/8-divine-plus/html.d:/usr/share/nginx/html \
a72860cb95fd

server {
	listen 80;
	server_name: localhost;
	location / {
		root /usr/share/nginx/html;
		index index-test.html index-test.htm;
	}
}

注意：
- 如果报错403，需要检查 default.conf 文件的 server/location/index 的配置，即 index-test.html 需要和数据卷主机的文件名保持一致


------- ------- ------- ------- ------- ------- -------
------- ------- ------- ------- ------- ------- -------
(2) Example Two
--
docker run -it --name c2 -v /root/data:/root/data_container -p 3000:4000 470671670cac
(1) 以镜像ID ( 470671670cac ) 创建容器
(2) 镜像取名：c2
(3) 数据卷 ( 宿主目录/root/data ) 对应 ( 容器目录/root/data_container )
(4) 端口映射 3000:4000
(5) -p 是port的意思
```

##### (3) Common Commands of Docker

```222222222
1
Docker-Related
--
启动docker --------------------- systemctl start docker   ( ctl是control的缩写 )
停止docker --------------------- systemctl stop docker
重启docker --------------------- systemctl restart docker
开机启动docker ------------------ systemctl enable docker   ( ！！！！！！！ )
查看docker概要信息 -------------- docker info
查看docker帮助文档 -------------- docker --help
查看docker版本信息 -------------- docker version



2
Image-Related
--
列出所有镜像 ---------------------------- docker images
           ---------------------------- docker images -a 所有镜像
           ---------------------------- docker images -q 只显示镜像ID

搜索镜像 -------------------------------- docker search
            ---------------------------- docker search -s 40 nginx 列出收藏数字不小于40的nginx镜像

下载镜像 --------------------------------- docker pull
         -------------------------------- docker pull nginx 从远程仓库拉取nginx镜像
         -------------------------------- docker pull nginx:[tag] 拉取指定版本
         -------------------------------- docker pull nginx:7 拉去7版本

删除镜像 --------------------------------- docker rmi
         -------------------------------- docker rmi nginx 删除最新的ngix镜像，latest
         -------------------------------- docker rmi nginx:7 删除具体的某个镜像，需要镜像名称和tag版本号
         -------------------------------- docker rmi -f nginx:7 强制删除某个镜像，必须镜像已经创建的容器正在运行时使用
         -------------------------------- docker rmi -f nginx centos 删除多个镜像，用空格隔开
         -------------------------------- docker rmi -f $(docker images -qa) 删除全部镜像



3
Container-Related
--
列出正在运行的容器 ------------------------------ docker ps
列出所有的容器 ---------------------------------- docker ps -a
列出最近创建的三个容器 -------------------------- docker ps -n 3
列出已经停止的容器 ------------------------------ docker ps -f status=exited

退出容器 ---------------------------------------- exit (或者ctrl+p+q)
进入容器 ---------------------------------------- docker attach 容器ID | 容器名称
启动容器 ---------------------------------------- docker start 容器ID | 容器名称
重启容器 ---------------------------------------- docker restart 容器ID | 容器名称
停止容器 ---------------------------------------- docker stop 容器ID | 容器名称
暴力停止容器 ------------------------------------- docker kill 容器ID | 容器名称

删除容器 --------------------------------------- docker rm -f 容器ID | 容器名称
删除所有容器 ------------------------------------ docker rm -f $(docker ps -qa) 删除全部容器
( 注意区分删除镜像 ------------------------------ docker rmi -f $(docker images -qa) 删除全部镜像
( 已经在运行的容器，或者镜像创建的容器正在运行想删除，用 -f 强制删除 )

--

以守护方式启动容器 ------------------------ docker run -di --name 容器名称 镜像ID
// 不会进入容器，并且会返回容器ID

进入容器，并执行命令 ----------------------- docker exec -it 容器ID | 容器名称 执行命令
// 进入容器 ------------------------------ docker attach 容器ID | 容器名称

查看容器日志 ------------------------------ docker logs 容器ID | 容器名称

查看容器进程 ------------------------------ docker top 容器ID | 容器名称

宿主机拷贝文件到容器 ----------------------- docker cp 需要拷贝的文件或目录 容器id|名称 ：容器目录
容器文件拷贝到宿主机 ----------------------- docker cp 容器id|名称:文件目录|文件 宿主机目录
```

```333333333 Other Commands
创建文件夹 ------------- mkdir name
删除文件夹 ------------- rm -rf name
创建文件 --------------- touch name
现实当前路径 ------------ pwd
```

##### (4) Dockerfile

```
FROM node
LABEL maintainer="woow_wu7"
LABEL version="1.0"
ENV WORK_PATH /app
COPY . $WORK_PATH
WORKDIR $WORK_PATH
RUN npm install
RUN npm run docs:build
FROM nginx
COPY --from=0 /app/docs/.vuepress/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

| 语法             | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FROM             | 引用基础镜像 - from                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| MAINTAINER       | 维护者 - maintainer <br/> name<邮箱或者电话>                                                                                                                                                                                                                                                                                                                                                                                                             |
| LABEL            | 对镜像的描述，类似于注释 - label <br/> name="xxxx" \ <br/> date="xxxx"                                                                                                                                                                                                                                                                                                                                                                                   |
| **`ENV`**        | 设置容器内的环境变量和常量 <br/> 在其他地方通过 ( $ ) 来引用该环境变量的值                                                                                                                                                                                                                                                                                                                                                                               |
| **`ARG`**        | 和 ENV 的作用相似，都是设置 - 环境变量 <br/> **不同点**：ARG 所设置的构建环境的环境变量，在将来容器运行时是不会存在这些环境变量的。但是不要因此就使用 ARG 保存密码之类的信息，因为 docker history 还是可以看到所有值的。 <br/><br/> Dockerfile 中的 ARG 指令是定义参数名称，以及定义其默认值。<br/>该默认值可以在构建命令 docker build 中用 --build-arg <参数名>=<值> 来覆盖 <br/>ARG 指令有生效范围，如果在 FROM 指令之前指定，那么只能用于 FROM 指令中 |
| **`WORKDIR`**    | 当前的工作目录，即是进入容器后，默认所在的当前目录                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`RUN`**        | **在新建镜像时执行的命令** - run <br/> 比如 RUN yum -y install Vim 表示用 yum 来安装 Vim 包                                                                                                                                                                                                                                                                                                                                                              |
| **`EXPOSE`**     | 暴露端口 - expose                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`CMD`**        | **设置容器启动后默认执行的命令和参数** <br/> 比如 CMD /bin/bash <br/> - 如果 docker run 的时候指定了其他 CMD 命令，Dockerfile 中的 CMD 命令被忽略；如果定义了多个 CMD，只有最后一个会执行 <br/> - CMD ["/bin/echo","hello docker"]                                                                                                                                                                                                                       |
| **`ENTRYPOINT`** | **设置容器启动时运行的命令**                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ADD              | ADD 除了 COPY 还有额外解压功能                                                                                                                                                                                                                                                                                                                                                                                                                           |
| COPY             | 拷贝文件                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

##### (5) Docker Commit 提交镜像

```
docker commit -a='作者' -m='备注' 运行时的容器ID 新镜像名称
docker commit -a='woow_wu7' -m='8-divine-plus-image-01' 34cbc498d554 8-divine-plus-image-01
```

##### (6) Docker push 推送镜像到服务器

```
第一步: 注册 hub.docker.com/，获取docker id 和 密码
第二步：命令行登陆 ( docker login )
第三步：打标签 ( docker tag 镜像名) // docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
第四步：docker push 镜像名称 : TAG版本号

docker login

docker tag local-image:tagname new-repo:tagname
docker push new-repo:tagname

docker tag IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
docker push 镜像名:标签号

docker tag 镜像名 Repository/name:tag
// tag: 名自己取 比如1.1.1或者v1等
// Repository: 是在hub上的repository
// name: 也是在那里设置的

----
具体如下
docker tag 8-divine-plus-image-01 7uwwoow/frontend:v1
docker push 7uwwoow/frontend:v1
```

##### (7) Docker build

```
docker build -f Dockerfile的路径 -t 镜像的名字：标签 .
docker build -f 路径/Dockerfile文件名 -t Repository/name:tag.

在Dockerfile所在目录下执行:
docker build -f Dockerfile -t test-build-image:v1 .

注意:
- 后面有个小点
- 并且有一个空格
```

##### (8) Some Problems

```
1
The location of the docker.
- /var/lib/docker/
- Images, containers, volumes, and networks stored in /var/lib/docker/
- aren't automatically removed when you uninstall Docker.


2
Official website.
- https://docs.docker.com/engine/install/centos/
- [我的掘金](https://juejin.cn/post/6844904099024994312#heading-8)


3
To check whether 'yum' is installed.
- $rpm -qa yum


4
docker 拉取镜像时总是 retry，如何解决
- 在 Docker 守护进程配置文件（daemon.json）中添加加速器地址：
- tutorial: https://www.cnblogs.com/blogof-fusu/p/18257012
- tutorial: https://www.cnblogs.com/blogof-fusu/p/18257012
{
  "registry-mirrors": ["https://your-mirror-url"]
}
sudo systemctl daemon-reload
sudo systemctl restart docker
```
