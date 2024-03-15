# CookEat!(꾸깃)

꾸깃 꾸깃 접었다 펴는 Cook하고 Eat하는 레시피 공유 사이트

서비스 웹페이지 주소

http://cookeat.shop:8080

## 목차
---
- [팀원](#팀원)
- [사용스택](#사용스택)
- [메인화면](#메인화면)
  - [네비게이션바](#네비게이션바)
  - [커뮤니티](#커뮤니티)
  - [회원가입](#회원가입)
  - [로그인](#로그인)
- [프로필](#프로필)
  - [팔로워](#팔로워)
  - [팔로잉](#팔로잉)
  - [북마크](#북마크)
- [프로필수정](#프로필수정)
  - [프로필사진업로드](#프로필사진업로드)
  - [닉네임/아이디수정](#닉네임아이디수정)
  - [회원탈퇴](#회원탈퇴)
## 팀원
---
![Team](image/CrewProfile.png)
---

## 사용스택
---
### FrontEnd

- CSS
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

- HTML
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

- Javascript
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### BACKEND

- Node.Js
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">

- Express
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
- Jwt
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)


### DB

- MySQL
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)


### Communicate

- Slack
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

- Notion
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

- GitHub
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## 메인화면
---
* 웹서비스에 접속하면 바로 보이는 화면입니다.

* 상단의 Navigation Bar에는 좌측에 로고 Commutnity가 있습니다.

* 우측에는 아이콘을 클릭해 회원가입 및 로그인 메뉴가 있습니다.

* 애니메이션으로 돌아가는 카드를 클릭하면 레시피 일부를 확인해 볼 수 있습니다.

![메인화면](image/Index.png)


## 네비게이션바
---
* 먼저 네비게이션바입니다

* 네비게이션바에는 각 페이지로 이동할 수 있는 메뉴 창

* 로고를 클릭하면 홈으로 이동할 수 있는 버튼

* 커뮤니티 페이지로 이동 가능한 COMMUNITY메뉴

* 우측에는 회원가입 및 로그인이 가능한 아이콘이 있습니다.


## 커뮤니티
---
* 커뮤니티 페이지입니다.

![community](image/CommunityPage.png)

* 하단에 페이지네이션 기능을 추가해 페이지 이동이 가능합니다.

![Pagination](image/Pagination.png)

* 글을 클릭하면 글의 내용을 확인할 수 있습니다.
* 작성자만 게시글 삭제 및 수정이 가능합니다.
![PostEdit](image/PostEdit.png)

* 게시판은 회원가입 후 로그인 한 사용자만 작성이 가능합니다.
* 비로그인자도 글 확인은 가능합니다.
* 로그인 하지 않으면 작성할 수 없다는 경고문이 나타납니다.

![NoLoginAlert](image/NoLoginAlert.png)

* 게시글은 글쓰기 버튼을 누르고 난 후 다음의 업로드 양식에 따라 글을 작성할 수 있습니다.

![PostWrite](image/PostWrite.png)
![PostWrite](image/PostWrite_after.png)


* 다음처럼 이름, 내용, 작성자에 따라 카테고리를 선택 후 검색할 수 있습니다

![SearchCategory](image/SearchCategory.png)

* 제목+내용으로 선택하고 검색하면 다음과 같이 나타납니다

![TitleSearch](image/TitleSearch.png)

* 작성자로 선택하고 검색하면 다음과 같이 나타납니다

![UserSearch](image/UserSearch.png)


## 회원가입
---
* 다음은 회원가입 페이지입니다.

![join](image/JoinPage.png)

* 회원가입에는 ID와 닉네임을 중복검사하는 버튼이 있으며, 버튼을 클릭해 중복검사를 해야지 가입이 가능합니다.

* 미검사시 다음과 같이 중복검사를 실시하라는 알림이 나타납니다.

![CheckId](image/CheckId.png)

* ID와 닉네임을 중복 검사 후 중복되면 다음과 같은 알림이 나타납니다.

![idUseNO](image/idUseNO.png)
![nickNameUseNO](image/nickNameUseNO.png)

* ID와 닉네임 중복 검사 후 중복되지 않으면 다음과 같이 가입이 가능하다는 알림이 나타납니다.

![idUseOK](image/idUseOK.png)
![nickNameUseOK](image/nickNameUseOk.png)

* 회원가입 진행 중에 비밀번호 입력란과 비밀번호 확인란의 입력한 값이 다르면, 입력 값이 다르다는 문구가 나타납니다.

![PassCompareWrong](image/PassCompareWrong.png)

* 일치하면 사라집니다

![PassCompareCorrect](image/PassCompareCorrect.png)

* 모든 절차 완료 후 제출 버튼을 누르면 가입이 완료됩니다.

![JoinSuccess](image/JoinSuccess.png)

## 로그인
---
* 다음은 로그인 페이지입니다.

![loginform](image/LoginPage.png)

* 로그인을 완료하면, 다음과 같이 로그인 됩니다.

![login_success](image/loginSuccess.png)

## 프로필
---
* 다음은 프로필 페이지입니다

![MyProfile](image/MyProfile.png)

* 프로필 페이지에는 기본 프로필 이미지, 팔로워, 팔로잉 목록, 북마크, 프로필 수정 기능이 있습니다.
* 프로필에는 아이디, 닉네임도 표시됩니다.

> ### 팔로워

![FollowerPage](image/FollowerPage.png)

* 팔로워 페이지에는 나를 팔로우하는 사람을 확인할 수 있습니다.
* 팔로워를 클릭하면 팔로워가 작성한 글을 확인할 수 있습니다.

![FollowingPostList](image/FollowingPostList.png)

> ### 팔로잉

* 팔로잉 페이지에는 내가 팔로잉 하는 사람을 확인할 수 있습니다.
* 우측의 하트를 클릭하면 팔로잉을 삭제할 수 있습니다.

![FollowerPage](image/FollowerPage.png)
![FollowCancel_before](image/FollowCancel_before.png)
![FollowCancel_after](image/FollowCancel_after.png)

> ### 북마크

* 북마크 페이지입니다
![BookmarkList](image/BookMarkList.png)

* 내가 북마크한 게시글을 볼 수 있습니다.
* 우측의 북마크 아이콘을 클릭하면 북마크를 삭제할 수 있습니다.

## 프로필수정
---
* 다음은 프로필 수정페이지입니다.
![ProfileEdit](image/ProfileEdit.png)

* 프로필 수정페이지에서는 프로필사진 업로드, 회원탈퇴, 아이디/닉네임 수정 기능이 있습니다.

> ### 프로필사진업로드
* 프로필 사진 업로드 입니다.
![MyProfile](image/ProfileEdit.png)

* 프로필 이미지 업로드를 하기 위해서는 파일선택 버튼을 누른 후, 원하는 이미지를 선택합니다.
![ProfileImageUpload](image/ProfileImageUpload.png)

* 이미지 선택하면 선택한 이미지가 텍스트로 나타나고, 프로필 사진 등록 버튼을 누르면 프로필 이미지가 변경됩니다.
![ProfileImageUploadSuccess](image/ProfileImageUploadSuccess.png)

> ### 닉네임/아이디수정
* 닉네임/아이디 수정입니다.
 ![ProfileEditIdNick](image/ProfileEditIdNick.png)

* 변경하고 싶은 아이디와 닉네임을 입력 한 후에 Save Profile 버튼을 클릭하면 저장됩니다.
 ![ProfileEditSuccess](image/ProfileEditSuccess.png)

* 변경된 정보로 네비게이션 바에도 정보가 수정됩니다.

    ![ChangeProfile](image/ChangeProfile.png)

> ### 회원탈퇴
![DeleteUser](image/DeleteUser.png)

* Delete User 버튼을 누르면 회원 탈퇴를 할 수 있습니다.
