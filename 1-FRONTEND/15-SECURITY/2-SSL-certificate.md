##### SSL certificate

##### (0) 一些关键字

- SSL/TLS 证书通常是安装在服务器上的
-
- [AA.]
- `【 私钥 - Private Key 】`
- // - 作用: 私钥用于 加密数据 和 进行数字签名
- // - 关系: 公钥加密私钥解
-
- [BB.]
- `【 证书签名请求 - CSR 】`
- // - 作用: 用于向证书颁发机构（CA）申请数字证书
- // - 包含: CSR 是包含 ( 公钥 ) 和 ( 相关身份信息 ) 的文件

##### (1) 生成 SSL 的 CSR

- 1
- [SAN] - [Subject-Alternative-Name] - 主题备用名称
- // - SAN 是 SSL 证书中的一个扩展，允许证书用于多个域名
- // - 个证书可以同时用于 www.example.com 和 example.com
-
- 2
- [CN] - [Common-Name] - 通用名称
- // - CN 是证书中的一个字段，通常是证书的主要域名
-
- 3
- [CSR] - [Certificate-Signing-Request] - 证书签名请求

##### (1.1) 生成 SSL 的 CSR 方式一 / 不用配置文件

```java 1. 生成SSL的CSR 方式一 不用配置文件
生成SSL的CSR 1
-

1. sudo apt-get install openssl
2. brew install openssl

3.
生成私钥
$ openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
- 该命令将生成 ( private.key ) 在 ( 当前文件夹 ) 下

4.
生成CSR
$ openssl req -new -key private.key -out certificate.csr
- Country Name (2 letter code) [AU]: 输入你的国家代码，例如CN（中国）。 -------------------- HK
- State or Province Name (full name) [Some-State]: 输入你所在的州或省。------------------ HONG KONG ISLAND
- Locality Name (eg, city) []: 输入你所在的城市。 --------------------------------------- ADMIRALTY
- Organization Name (eg, company) [Internet Widgits Pty Ltd]: 输入你的组织名称。--------- Cathay Pacific Airways Limited
- Organizational Unit Name (eg, section) []: 输入你的组织单位名称（可选）。----------------- Information Management - 1022|0895
- Common Name (e.g. server FQDN or YOUR name) []: 输入你的域名，例如www.example.com。 --- benefits.ete.cathaypacific.com
- Email Address []: 输入你的电子邮件地址。----------------------------------------------- imtskl@cathaypacific.com
- A challenge password []: 输入一个挑战密码（可选）。
- An optional company name []: 输入一个可选的公司名称（可选）。



5.
生成好的CSR如何查看具体内容
$ openssl req -text -noout -in yourdomain.csr
Certificate Request:
    Data:
        Version: 1 (0x0)
        Subject: C=HK, ST=HONG KONG ISLAND, L=ADMIRALTY, O=Cathay Pacific Airways Limited, OU=Information Management - 0895, CN=benefits.ete.cathaypacific.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:d7:10:85:1e:f0:4b:ac:d3:7e:40:a1:2a:61:4c:...
                Exponent: 65537 (0x10001)
        Attributes:
            Requested Extensions:
                X509v3 Subject Key Identifier:
                    9F:01:38:D7:A3:8F:22:7F:DB:0D:05:74:D0:AE:AF:CD:5E:3B:29:6E
                X509v3 Basic Constraints:
                    CA:FALSE
                X509v3 Key Usage:
                    Digital Signature, Key Encipherment
                X509v3 Extended Key Usage:
                    TLS Web Client Authentication, TLS Web Server Authentication
                X509v3 Subject Alternative Name:
                    DNS:benefits.ete.cathaypacific.com
                Netscape Comment:
                    OpenSSL Generated Certificate
    Signature Algorithm: sha256WithRSAEncryption
    Signature Value:
        86:18:4e:28:1a:c8:ba:7d:c1:6d:3c:ea:e2:6e:73:2b:b2:bf:...
```

##### (1.2) 生成 SSL 的 CSR 方式二 / 配置文件

```java 2. 生成SSL的CSR 方式二 配置文件
2.1
openssl.cnf
-
[ req ]
default_bits       = 2048
default_md         = sha256
default_keyfile    = private.key
distinguished_name = req_distinguished_name
req_extensions     = req_ext

[ req_distinguished_name ]
countryName                 = Country Name (2 letter code)
stateOrProvinceName         = State or Province Name (full name)
localityName               = Locality Name (eg, city)
organizationName           = Organization Name (eg, company)
commonName                 = Common Name (e.g. server FQDN or YOUR name)

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1   = www.example.com
DNS.2   = example.com



2.2
openssl req -new -key private.key -out certificate.csr -config openssl.cnf
```
