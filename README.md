# ShortURL
一個使用Node.js + Express製作的短網址產生器

## 功能
1. 使用者可以將網址縮短，並使用(需沒有關伺服器)
2. 使用者可以按複製按紐，將網址複製並直接開啟新頁面貼上
3. 使用者如果沒有輸入URL，會提示
4. 使用者如果輸入相同網址，會產生相同的縮址


## 安裝流程：
1. 打開terminal, clone此專案
    ```
    git clone https://github.com/alvinkane/A11_shorturl.git
    ```
2. 移到存取的資料夾(A11_shorturl)
3. 安裝npm套件
    ```
    npm install
    ```
4. 安裝nodemon套件(若有可省略)
5. 在專案內創造一個env檔案，並在其中輸入MongoDB connection string
    ```
    MONGODB_ENV=mongodb+srv://<username>:<password>@<cluster>.pk4dwnp.mongodb.net/restaurant-list?retryWrites=true&w=majority
    ```
6. 執行專案
    ```
    npm run dev
    ```
7. 出現 "This is listening on http://localhost:3000" 'mongodb connected'代表成功
8. 開啟任一瀏覽器輸入This is listening on http://localhost:3000

## 初始頁面

![index](https://user-images.githubusercontent.com/118908615/229262073-d3d80d16-03eb-4e70-a648-7576150aaa5c.png)
## 縮址後頁面

![shortener](https://user-images.githubusercontent.com/118908615/229262076-b562ef4e-b767-42b5-a700-23d009c57001.png)

## 使用版本
node: 14.16.0  
npm: 6.14.11  
nodemon: 2.0.21  
