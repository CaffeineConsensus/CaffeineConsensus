Employee key is not yet signed by the CA.

# Steps to generate key, sign a message, and extract relevant information (from SolRSAverify)
> openssl genrsa -out private.pem 1024

> cat private.pem
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDfPt3gCblrxbA7SL1z/nCjrSDq9iTQ3BuhIaRcxzmJN0G3z4Ks
8ckVc+yCZlOJl8Zpl2AUjeV+VJgxkeygF29RjlR7hf4Lt9nhUN8Z7uc0z1M4IZx/
j3sTs59ThBefYsE15UTLcL51BXUfNFaOBpgQla7sTzqIdjlxij4R1IwkDQIDAQAB
AoGAQEoBaThDrnaSpq/u5w158Ji15xQVTBRm3IMsqw8wUYSZJ07Z6eYDK2tjy7We
DvynRdcy8xhd44CHB5dnVj8JbiBX26i05fkOy3vtWtWWPQi+lIBLPOYiJA3Jeu01
KrRUKpDjDx9jz5bV3RQNIKhy6oWAmzqZw84w2H5Yu1GeNl0CQQD2NzMllvxh1b03
2CF0KNvEJo83VmpGoNNnljKaMwuDXeog+NGEkOL89iBZLmaErdaUIKXMi7rKBHTe
zc4KoeMrAkEA6B388AOtofBiS0kLumLxW6S27cbjOiJ6kgi2QuoZeYjwP1Sd2vBJ
d/0ooqwO2m2ZBMhHvfWJNsj97bX9d2VZpwJBAK9Ruv/HNUtM8QF0ys110pcnhc83
n1FPb3lRQBMAye/uzapQwpAMwzSw5XPbUHClgCfV33l4/baf2cBU96QmhiUCQAqq
9ikBwkUjCyFypftW+MjBdTbQYTkWxJNZmybQI4OWa5Q9i1O4n2fIVsnDJpubVeEG
Y2Wzly7RZfo61v9ZxRkCQDwTiiLUD7w6IE9CHhz6j1yI6P1Nn+wuymu7YMXG0zjs
H6knPQhmeq6EXguCWPVvCIGbHZn16g+s9jkUEq48V+Y=
-----END RSA PRIVATE KEY-----

> openssl rsa -in private.pem -outform der -pubout -out public.pem

 addd -n to echo to remove final carriage return
> echo -n "hello world" | openssl dgst -sha256 -sign private.pem -out | xxd -p | tr -d \\n

079bed733b48d69bdb03076cb17d9809072a5a765460bc72072d687dba492afe951d75b814f561f253ee5cc0f3d703b6eab5b5df635b03a5437c0a5c179309812f5b5c97650361c645bc99f806054de21eb187bc0a704ed38d3d4c2871a117c19b6da7e9a3d808481c46b22652d15b899ad3792da5419e50ee38759560002388

extract the public n from the public key
> openssl asn1parse -inform TXT -i -in public.pem -strparse 18
    0:d=0  hl=3 l= 137 cons: SEQUENCE
    3:d=1  hl=3 l= 129 prim:  INTEGER           :DF3EDDE009B96BC5B03B48BD73FE70A3AD20EAF624D0DC1BA121A45CC739893741B7CF82ACF1C91573EC8266538997C6699760148DE57E54983191ECA0176F518E547B85FE0BB7D9E150DF19EEE734CF5338219C7F8F7B13B39F5384179F62C135E544CB70BE7505751F34568E06981095AEEC4F3A887639718A3E11D48C240D
    135:d=1  hl=2 l=   3 prim:  INTEGER           :010001

get the `e`=010001 and `n` DF..0D


# Certificate

Country code: CH
Company name: CoffeeInc
IMPORTANT: set the common name to a unique value. For the CA use CoffeeInc, for the employee use Employee1

- Creates a self-signed certificate to act as the company Certificate Authorithy:

openssl req -x509 -newkey rsa:1024 -sha256 -days 3650 -nodes -keyout ca_private.key -out ca_cert.crt
openssl rsa -in ca_private.key -outform der -pubout -out ca_public.pem

- Create employee key and request to sign
openssl req -new -nodes -newkey rsa:1024 -keyout employee_private.key -out employee_certification_request.pem

- Sign employee Certificate with CA generated above
openssl x509 -req -in employee_certification_request.pem -days 3650 -CA ca_cert.crt -CAkey ca_private.key -CAcreateserial -out employee_cert.crt

- create public key
openssl rsa -in employee_private.key -outform der -pubout -out employee_public.pem

- Outputs certificate in text readable form:
openssl x509 -in ca_cert.crt -text -noout
openssl x509 -in employee_cert.crt -text -noout

- Extract public key from certificate
openssl x509 -pubkey -noout -in cert.pem

- Extract modulus (m or n) from certificate
openssl x509 -noout -modulus -in employee_cert.crt 
openssl x509 -noout -modulus -in ca_cert.crt 

# Certificate employee_cert
Certificate:
    Data:
        Version: 1 (0x0)
        Serial Number:
            24:c4:dd:33:81:df:52:32:e1:6d:b4:15:e0:25:4c:cd:02:61:05:bf
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C = CH, ST = Some-State, O = CoffeeInc
        Validity
            Not Before: Apr 15 11:06:46 2023 GMT
            Not After : Apr 12 11:06:46 2033 GMT
        Subject: C = CH, ST = Some-State, O = CoffeeInc
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (1024 bit)
                Modulus:
                    00:c1:41:9c:70:9d:96:de:36:c9:0a:4b:d4:27:c6:
                    70:3d:bc:17:f9:d1:1c:18:28:fb:5a:91:5d:8b:98:
                    f4:f3:db:de:a0:d1:c5:47:cd:87:a0:4f:42:90:02:
                    bf:20:33:b4:1f:7a:1b:53:54:7f:31:a5:25:7e:88:
                    e5:25:3b:b8:56:91:86:db:04:e1:68:d2:b8:17:bb:
                    00:52:59:97:de:f7:09:a0:bf:96:11:98:42:45:b2:
                    1c:8f:97:67:ed:2f:5c:9f:5d:70:ca:ff:cd:cd:58:
                    ac:d5:36:26:af:44:b0:6c:2d:74:0c:75:08:89:a7:
                    c0:b9:ae:3a:3f:23:2b:37:25
                Exponent: 65537 (0x10001)
    Signature Algorithm: sha256WithRSAEncryption
    Signature Value:
        9d:c5:cc:f2:9d:3e:32:05:b1:a2:b5:3e:29:f4:fe:24:13:22:
        e5:c4:5d:a1:34:62:48:9c:e7:97:fd:88:42:80:f5:1d:96:64:
        24:c4:90:1d:b5:fa:1f:b7:c8:59:17:17:3a:87:2e:ab:96:24:
        ef:8d:2c:51:70:88:59:87:f8:3a:7c:6d:fb:99:74:4e:d8:1a:
        cf:a5:3b:8d:9b:3b:6a:80:71:67:19:26:79:49:77:38:98:a9:
        af:35:46:03:28:bb:d1:bf:44:52:ca:22:7e:54:25:d5:1c:2a:
        34:ef:d2:71:22:9c:89:20:b6:22:5f:26:48:8e:94:79:22:1e:
        fb:72


# asdf

https://superuser.com/questions/1428012/cant-verify-an-openssl-certificate-against-a-self-signed-openssl-certificate

openssl req -new -newkey rsa:1024 -keyout rootprivkey.pem -out rootreq.pem -config ca_conf.cnf

openssl ca -out rootcrt.pem -days 2652 -keyfile rootprivkey.pem -selfsign -config ca_conf.cnf -extensions ca_ext -in rootreq.pem -sigopt rsa_padding_mode:pkcs1


