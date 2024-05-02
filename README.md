# slack-clone アプリ

Slack の基本機能を模倣したチームコミュニケーションアプリ

## 基本機能

- ユーザー登録と認証
  - アプリを使用するために、ユーザーはアカウントを作成し、ログインする必要がある。Google 認証を利用してユーザー登録を行う必要がある。
- メッセージの送受信
  - ユーザーはリアルタイムでテキストメッセージを送受信できる。
- チャンネルの作成と管理
  - ユーザーはチャンネルを作成し、管理することができる。これにより、特定のトピックやグループに関連するディスカッションを異なるチャンネルで実施できる。

## 技術スタック

その他の使用技術やバージョン情報などは package.json を参照

| 技術         | 用途                           |
| ------------ | ------------------------------ |
| React        | フロントエンド UI ライブラリ   |
| TypeScript   | 静的型付け言語                 |
| Vite         | ビルドツールおよび開発サーバー |
| Tailwind CSS | CSS フレームワーク             |
| Biome        | リンター及びフォーマッター     |

## フォルダ構成

```text
src/
├─ app/                        # Redux設定
│  ├─ hooks.ts                 # Reduxのカスタムフック
│  └─ store.ts                 # Reduxストアの設定
│
├─ components/
│  ├─ ChatContainer/
│  │  ├─ ChannelAddModal.tsx   # チャンネルを追加するモーダル
│  │  ├─ ChannelCell.tsx       # チャンネル名の表示
│  │  ├─ ChannelList.tsx       # チャンネルリスト、チャンネルを追加ボタン
│  │  ├─ MessageArea.tsx       # メッセージリスト、メッセージのフォーム
│  │  └─ MessageTile.tsx       # メッセージ1つの表示
│  ├─ ChatContainer.tsx        # 右側部分の表示
│  ├─ Login.tsx                # Googleでログイン
│  └─ Sidebar.tsx              # サイドバーの表示
│
├─ features/                   # 機能ごとのReduxロジックとコンポーネント
│  ├─ auth/
│  │  ├─ auth.ts               # Firebase認証関連の関数（Googleログイン等）
│  │  └─ useAuthState.tsx      # 自動ログイン機能
│  ├─ channel/
│  │  ├─ channelAPI.ts         # チャンネルに関するAPI呼び出しの定義
│  │  └─ channelSlice.ts       # state管理に関するRedux Sliceの定義
│  ├─ message/
│  │  └─ messageAPI.ts         # メッセージに関するAPI呼び出しの定義
│  └─ user/
│     ├─ userAPI.ts            # ユーザー情報に関するAPI呼び出しの定義
│     └─ userSlice.ts          # state管理に関するRedux Sliceの定義
│
├─ firebase/                   # Firebase設定
│  └─ firebaseconfig.ts
│
├─ types/                      # TypeScriptの型定義
│  ├─ Channel.ts
│  ├─ Message.ts
│  └─ User.ts
│
├─ index.css                   # グローバルスタイルシート
├─ index.tsx                   # アプリケーションのエントリポイント
└─ App.tsx                     # アプリケーションのルートコンポーネント
```
