##### Kubernetes

```
1
Tools
- Mobaxterm: https://mobaxterm.mobatek.net/
```

##### (二) NAS/OSS

##### 2.1 PV 和 PVC

```
PV: PersistentVolume
  - 是 Kubernetes 中的一个资源对象，它表示集群中的一块持久化存储（例如云存储、网络存储等）。
  - PV 是管理员预先配置好的存储资源，它独立于 Pod 存在，生命周期长久，并且可以动态地供应给 Pod。
PVC: PersistentVolumeClaim
  - 是 Pod 对 PV 的请求，用于声明 Pod 所需的存储资源。
  - PVC 允许用户动态地请求存储资源，而不必关心实际的存储类型或位置
---

1
在实际使用中
PVC: 开发者通过定义 PVC 来请求所需的存储资源，
PV: 而 Kubernetes 系统会根据定义好的 PV 来满足这些请求，从而实现持久化存储与 Pod 的解耦和灵活管理。

2
区别与关系
PV 是存储的实际资源，而 PVC 是对 PV 的请求和声明。
PV 由集群管理员配置和管理，PVC 由应用开发者或管理员创建和使用。
PV 可以独立存在，等待被 PVC 使用；而 PVC 则是 Pod 访问 PV 的中介。
PVC 通过声明 Pod 所需的存储资源，允许 Pod 动态绑定到合适的 PV。
```

##### 2.2 NAS 和 PV/PVC 和 Ceph 的关系

```
PV 和 NAS 的使用：
- PV 可以配置为使用 NAS 提供的存储空间。
- 例如，PV 可以配置为使用 NFS（Network File System）协议连接到 NAS 服务器上的共享文件系统。这样，多个 Pod 可以通过 PVC 请求并共享同一个 NFS PV。

PVC 和 NAS 的使用：
- PVC 可以请求 NAS 提供的 PV，以满足 Pod 对文件级别存储的需求。
- 例如，通过 PVC 请求一个 NFS 类型的 PV，Pod 可以通过 NFS 挂载卷访问 NAS 上的文件。
```

```lua

                     +------------------------+
                     |        Kubernetes      |
                     +------------------------+
                             |
                    +---------------------+
                    |     Applications     |
                    +---------------------+
                       |             |
             +----------------+   +----------------+
             |     Pod #1     |   |     Pod #2     |
             +----------------+   +----------------+
             |  Volume (PVC)  |   |  Volume (PVC)  |
             +----------------+   +----------------+
                   |                      |
          +--------------+       +--------------+
          |     PVC      |       |     PVC      |
          +--------------+       +--------------+
              |                        |
   +-----------------+       +------------------+
   |     PV (Ceph)   |       |   PV (NFS, etc)  |
   +-----------------+       +------------------+
      |                            |
 +------------------+    +-------------------+
 |  Ceph Storage    |    |    NAS Storage    |
 +------------------+    +-------------------+

```

##### (三) Related to Harbor

```
1
readNamespacedConfigMap
- signature:
  - readNamespacedConfigMap(name, namespace, pretty?, options?): Promise<{
      body: V1ConfigMap;
      response: IncomingMessage;
    }>
- function
  - It used to get the specific ConfigMap in a specific namespace.
  - 用于读取特定命名空间中指定ConfigMap的API方法


2
patchNamespacedConfigMap
- signature:
  - patchNamespacedConfigMap(name, namespace, body, pretty?, dryRun?, fieldManager?, fieldValidation?, force?, options?):       Promise<{
      body: V1ConfigMap;
      response: IncomingMessage;
    }>
- function
  - 指定命名空间内的 ConfigMap 资源进行部分更新（patch）
- 参数详解：
  - name: 要更新的ConfigMap的名称。
  - namespace: 包含目标ConfigMap的命名空间名称。
  - body: 一个JSON对象，代表了更新后的ConfigMap的内容。通常包含data字段，其中包含了键值对形式的配置数据。
  - pretty: 如果设置为true或"true"，则返回的输出将被格式化以提高可读性。
  - dryRun: 如果设置，会模拟执行请求而不实际更改任何资源。可能的值有"All", "Server", 或者"Client".
  - fieldManager: 标识正在操作此资源的系统组件或工具的名称。这有助于追踪谁在更改资源。
  - fieldValidation: 指定如何验证字段。可能的值有"Strict", "Warning", 或者"Ignore"，分别表示严格验证、警告模式和忽略验证。
  - force: 如果设置为true，则允许强制更新即使资源版本已改变。
  - options: 可选参数，通常用于传递额外的HTTP请求选项。
```

##### 3 Others

- 1. aws s3 对象存储与 nas 的区别
  - https://blog.csdn.net/yujiubo2008/article/details/122453009
- 2. PV 和 PVC
  - PV:
    - 是 Kubernetes 中的一个资源对象，它表示集群中的一块持久化存储（例如云存储、网络存储等）。PV 是管理员预先配置好的存储资源，它独立于 Pod 存在，生命周期长久，并且可以动态地供应给 Pod。
  - PVC:
    - 是 Pod 对 PV 的请求，用于声明 Pod 所需的存储资源。PVC 允许用户动态地请求存储资源，而不必关心实际的存储类型或位置
- 2. ceph 和 nas 架构
  - Ceph 作为底层存储层，负责数据的持久化、复制、故障恢复和数据一致性等复杂任务。
  - 而 NAS 设备或服务（如 Ceph 自身的 NFS 服务）则作为接入层，使得用户或应用程序可以通过标准的文件系统协议（如 NFS 或 SMB/CIFS）来访问存储在 Ceph 中的数据，就像访问本地文件系统一样简单。
- 3. K8s 上的分布式存储集群搭建（Rook/ceph）
  - https://cloud.tencent.com/developer/article/1916824

```
1
readNamespacedPersistentVolumeClaim
- signature:
  - readNamespacedPersistentVolumeClaim(name, namespace, pretty?, options?): Promise<{
      body: V1PersistentVolumeClaim;
      response: IncomingMessage;
    }>
- function:
  - It used to read the persistent volume claim in a namespace.
  - 用于读取某个命名空间中的持久卷声明



2
readPersistentVolume
- signature:
  - readPersistentVolume(name, pretty?, options?): Promise<{
      body: V1PersistentVolume;
      response: IncomingMessage;
    }>
- function:
  - It used to read the detail messages of a specific 'Persistent Volume（PV）' in Kubernetes clusters.
  - 用于读取 Kubernetes 集群中某个特定的 Persistent Volume（PV）的详细信息
```

#####

#####

将 Go 语言代码翻译成 JavaScript 是一个复杂的过程，因为两种语言的特性和生态系统有很大的不同。以下是一个逐步翻译和重构 Go 语言代码的示例，该代码使用了 Ceph 文件系统和 Kubernetes API。我们将使用 Node.js 及其相应的库来实现相同的功能。

安装必要的依赖
首先，安装必要的 npm 包，例如 axios（用于 HTTP 请求）和 ceph（假设有一个用于与 Ceph 交互的库）。

bash
复制代码
npm install axios ceph fs-extra
代码翻译

1. 清理路径函数
   javascript
   复制代码
   const path = require('path');

function cleanPath(filePath) {
if (!filePath) {
filePath = '/';
}
if (!path.isAbsolute(filePath)) {
filePath = '/' + filePath;
}
return path.normalize(filePath);
} 2. 获取文件列表函数
javascript
复制代码
const ceph = require('ceph');
const log = require('loglevel');

async function getFileList(namespace, nasName, dirPath) {
dirPath = cleanPath(dirPath);

const subVolumePath = await getSubvolumePath(namespace, nasName);
const fullPath = path.join(subVolumePath, dirPath);
log.info(`[service cephFS] Getting file list from path: ${fullPath}`);

const cephClient = await ceph.getCephFSClient();
const dirEntries = await cephClient.listDir(fullPath);
log.info(`[service cephFS] Directory entries: ${JSON.stringify(dirEntries)}`);

const files = [];
for (const entry of dirEntries) {
if (entry.name === '.' || entry.name === '..') {
continue;
}
const filePath = path.join(fullPath, entry.name);
const stat = await cephClient.stat(filePath);
files.push(convertTo(entry, stat));
}
log.info(`[service cephFS] Files: ${JSON.stringify(files)}`);
return files;
} 3. 获取 SubVolume 路径函数
javascript
复制代码
const axios = require('axios');

async function getSubvolumePath(namespace, pvcName) {
const client = await getK8SClient();
const pvName = await client.getPVNameForPVC(pvcName, namespace);
const subvolumePath = await client.getPVSubVolumePath(pvName);
return subvolumePath;
}

async function getK8SClient() {
// 假设有一个函数可以获取 Kubernetes 客户端
// 实现细节根据具体情况而定
return axios.create({
baseURL: 'http://kubernetes.default.svc',
headers: {
'Authorization': `Bearer ${process.env.K8S_TOKEN}`,
},
});
} 4. 文件信息转换函数
javascript
复制代码
function convertTo(entry, stat) {
let sizeInMegaByte = 0;
let mtime = null;

if (stat) {
sizeInMegaByte = stat.size / (1024 _ 1024);
mtime = new Date(stat.mtime _ 1000);
}

return {
name: entry.name,
type: convertFileType(entry.type),
size: sizeInMegaByte,
lastModified: mtime ? mtime.toISOString() : null,
};
}

function convertFileType(dType) {
if (dType === 'directory') {
return 'dir';
} else {
return 'file';
}
} 5. 分页获取文件列表函数
javascript
复制代码
async function getVolumeFilesPage(namespace, nasName, dirPath, page, pageSize) {
const files = await getFileList(namespace, nasName, dirPath);
const count = files.length;
const offset = (page - 1) \* pageSize;
const limit = Math.min(offset + pageSize, count);
return {
files: files.slice(offset, limit),
curPath: dirPath,
count: count,
};
} 6. 上传文件函数
javascript
复制代码
const fs = require('fs-extra');

async function uploadFile(namespace, nasName, dirPath, file) {
dirPath = cleanPath(dirPath);
const subVolumePath = await getSubvolumePath(namespace, nasName);
const fullPath = path.join(subVolumePath, dirPath);
log.info(`[service cephFS] Uploading file to path: ${fullPath}`);

const cephClient = await ceph.getCephFSClient();
const filePath = path.join(fullPath, file.name);
const fileStream = fs.createReadStream(file.path);

await cephClient.writeFile(filePath, fileStream);
} 7. 创建目录函数
javascript
复制代码
async function makeDir(namespace, nasName, dirPath, dirName) {
dirPath = cleanPath(dirPath);
const subVolumePath = await getSubvolumePath(namespace, nasName);
const fullPath = path.join(subVolumePath, dirPath, dirName);
log.info(`[service cephFS] Creating directory at path: ${fullPath}`);

const cephClient = await ceph.getCephFSClient();
await cephClient.makeDir(fullPath);
} 8. 下载文件函数
javascript
复制代码
async function downloadFile(namespace, nasName, filePath) {
if (!filePath || filePath.startsWith('.')) {
throw new Error('Invalid file path');
}

const subVolumePath = await getSubvolumePath(namespace, nasName);
const fullPath = path.join(subVolumePath, filePath);

const cephClient = await ceph.getCephFSClient();
const file = await cephClient.openFile(fullPath);
return file;
} 9. 删除文件函数
javascript
复制代码
async function deleteFile(namespace, nasName, filePath) {
const subVolumePath = await getSubvolumePath(namespace, nasName);
const fullPath = path.join(subVolumePath, filePath);

const cephClient = await ceph.getCephFSClient();
await cephClient.delete(fullPath);
}
总结
以上代码片段展示了如何将 Go 语言中的逻辑转换为 Node.js，并使用适当的库来实现与 Ceph 文件系统和 Kubernetes 的交互。您可以根据具体需求对代码进行调整和优化。
