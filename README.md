## Deployment server

- Sign in ke aws console
- Pilih region Singapore ( dekat dengan Indonesia )
- Pilih ec2
- Pilih launch instance
- Pilih ubuntu
- PIlih next sampai security group
- Di security group tambahkan port 80, yang menandakan bahwa komputer ini
  bisa di akses dari browser melalui http
- Tambahkan 443 untuk https
- Tambahkan 3000 untuk contoh deploy server kita nantinya.
- Buat key-pair baru untuk authenticate ketika ingin masuk ke dalam komputer aws.
- Pilih instance yang sudah dibuat
- Connect ke instance nya
- Ketika muncul pop-up bisa ikuti perintah yang dituliskan di pop-up tersebut.
- Konek ke ssh nya
- Install nodejs di dalam komputer aws nya (https://github.com/nodesource/distributions/blob/master/README.md)[Link node js]
- Lakukan `git clone` aplikasi kalian
- cd ke dalam foldernya
- npm install
- node app.js
- Cari public ip nya buka di browser dan tambahkan `:3000` semisal dijalankan di dalam port 3000

- Agar server kita tetap jalan walaupun terminal dimatikan, bisa menggunakan pm2 install secara global.

- Untuk menjalankannya bisa menuliskan command `pm2 start app.js`

- Untuk merubah port applikasi express kita maka kita bisa membuat sebuah file `.env`, lalu dibuat satu key dengan nama `PORT` dan value `80`.

- Menghubungkan dengan domain, kalian bisa beli domain lalu pilih DNS management A record.

## Deployment client

- Buat bucket baru di S3
- Untick block all public access
- Setting properties menjadi static web site hosting
  - Index document menjadi index.html
  - Error document menjadi error.html
- Build aplikasi react kalian
- Upload isi kontent dari folder build
- Tambahkan bucket policies agar bucket bisa diakses secara public
  ( https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-2)[LInk]
- Akses endpoint yang disediakan oleh s3
- Bisa menggunakan DNS dengan tipe Cname
