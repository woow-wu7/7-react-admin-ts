# Podman

```
1
Install
- Official Website: https://github.com/containers/podman/blob/main/DOWNLOADS.md
- Tutorial: https://stackoverflow.com/questions/70564828/podman-machine-cannot-connect-to-podman-on-macos


2
command
-
$ podman version
$ podman info
-
$ podman machine --help
$ podman machine init
$ podman machine start # 启动 podman VM
$ podman machine stop # 停止VM
$ podman machine list # 罗列VM
$ podman machine rm # 删除VM
$ podman machine ssh # 通过SSH 进入VM，在终端进行操作
-
$ podman search <search_term> # 搜索   # podman search httpd --filter=is-official
# podman pull docker.io/library/httpd   # 拉取镜像
# podman images  # 查看镜像
$ podman run -dt -p 8080:80/tcp docker.io/library/httpd   # 创建运行容器   ，验证 $ curl http://localhost:8080
# podman ps  # 列出已创建和正在运行的容器,  -a，podman将显示所有容器（已创建、已退出、正在运行等)
$ podman stop "CONTAINER ID"  # 停止容器
$ podman rm "CONTAINER ID"   # 删除容器


3
Usage
-
$ podman images
```
