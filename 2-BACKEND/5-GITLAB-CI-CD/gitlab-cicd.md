##### Gitlab CI CD

- [link](https://juejin.cn/post/6897884843275714567)

##### (1) Pipeline Stage Job

- The relationship between Pipeline, Stage and Job.

```
+------------------+           +----------------+
|                  |  trigger  |                |
|   Commit / MR    +---------->+    Pipeline    |
|                  |           |                |
+------------------+           +----------------+

+--------------------------------------------------------+
|                                                        |
|  Pipeline                                              |
|                                                        |
|  +-----------+     +------------+      +------------+  |
|  |  Stage 1  |---->|   Stage 2  |----->|   Stage 3  |  |
|  +-----------+     +------------+      +------------+  |
|                                                        |
+--------------------------------------------------------+

+------------------------------------------+
|                                          |
|  Stage 1                                 |
|                                          |
|  +---------+  +---------+  +---------+   |
|  |  Job 1  |  |  Job 2  |  |  Job 3  |   |
|  +---------+  +---------+  +---------+   |
|                                          |
+------------------------------------------+

```

##### (2) The whole process of Gitlab CI CD

```
1
Install Gitlab Runner
- Official website link: https://docs.gitlab.com/runner/install/linux-repository.html
- Tutorial website like: https://juejin.cn/post/6897884843275714567#heading-9

- selecting the suitable platform to install. (docker)
  - (1) Run the register command
  - (2) select 'Docker' tabs.

- specific processes.
  - 1. 获取镜像
      docker pull gitlab/gitlab-runner
  - 2. 生成容器
      docker run -d --name gitlab-runner \
      --restart always \
      -v /srv/gitlab-runner/config:/etc/gitlab-runner \
      -v /var/run/docker.sock:/var/run/docker.sock \
      gitlab/gitlab-runner:latest
  - 3. 进入容器
      docker exec -it gitlab-runner /bin/bash
  - 4. 注册runner
      gitlab-runner register
      执行上上面这条命令后，将会进入下面的 [注册流程]
  - 5. 注册的具体流程如下:

注册流程

1. 生成注册用的docker容器
docker run --rm -it -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register

1. 运行上面步骤1的命令后，进入交互式注册命令过程，过程进入第3步

2. Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
   https://gitlab.com/

3. Please enter the gitlab-ci token for this runner
   jKKqXFTaMyBNNPwy-vFJ
   // 如何获取token => gitlab网站对应的项目/setting/CICD/Runners/Specific Runners中获取token
   // 没有runner的话 => 在 (Project runners) 中点击 (new project runner)，进入详情页面后输入tag后，点击create-runner，然后就有 runner authentication token

4. Please enter the gitlab-ci description for this runner
   7-react-admin-ts-runner

5. Please enter the gitlab-ci tags for this runner (comma separated)
   7-react-admin-ts-runner // tag

6. Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell
   docker // 1. 输入执行器，多数情况下都使用docker
   shell  // 2. 如何在deploy阶段，因为需要拷贝dist文件夹，则deploy的job可以使用shell来获取通过dependencies获取的artifacts

7. Please enter the Docker image (eg. ruby:2.6)
   node // 镜像，主要作用是如果在 ( .gitlab-ci.yml ) 文件中没有指定image，就会使用这里指定的image

输入完以上命令，会提示注册成功，同时在 => gitlab网站对应的项目/setting/CICD/Runners/Specific Runners中获取token中会显示刚刚注册的runner
```

##### (3) The .gitlab-ci.yml

- [How-to-config-tutorial](https://juejin.cn/post/6897884843275714567#heading-14)

```

```
