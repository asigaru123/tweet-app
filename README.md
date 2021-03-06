# Tweet-App

URL:https://my-app-domain.name

Twitterのようなつぶやきアプリを作成しました。  
つぶやき機能に加え他人をフォローする機能やツイートに対していいねを押す機能、  
ツイートへのコメント機能がついております。  
また、レスポンシブに対応しておりスマホからも閲覧可能です。

## 機能一覧
- メイン機能
  - ツイート機能(追加、変更、削除)
  - ツイートへのコメント機能
  - ツイートへのいいね機能
  - フォロー機能

- 認証機能
  - ログイン機能
  - ユーザー登録・削除機能
  - ユーザー情報変更機能
  - プロフィール画像変更機能

## 使用技術
- フロントエンド
  - React 17.0.2
  - typescript 4.4.4
  - Chakra-ui 1.0.16

- バックエンド
  - Java 11
  - SpringBoot 2.5.6
  - mybatis 2.2.0

- インフラ
  - docker 20.10.7
  - docker-compose 1.29.2
  - MYSQL 8.0.25
  - AWS(EC2、ALB、ACM、Route53、CodePipeline、CodeBuild、CodeDeploy)

## 構成図
![AWS構成図](https://user-images.githubusercontent.com/95522385/147403840-76b84c93-1674-4d6a-a8ca-d49f89682814.png)
- 主にEC2、ALB、ACM、Route53、CodePipeline、CodeBuild、CodeDeployを利用しました。
- ACMによるHTTPS化のため、ALBを導入しております。
- CI/CDパイプラインの構築には、CodePipeline、CodeBuild、CodeDeployを使用しております。

## 工夫した点
- ログイン認証にJWTを活用
  - トークン認証を活用し、Rest APIにおける認証環境を実装

- ツイートへのいいねやフォローを判定する機能を作成
  - いいね・フォロー済みかどうかを判別し、いいね・フォロー済みであれば解除する機能を作成
