import { pool } from "../config/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userAuthService {
    // 회원가입
    static async addUser({ userId,userName,userNickname,userPassword }) {
        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        let newUser = {
            userId,
            userName,
            userNickname,
            userPassword: hashedPassword,
            errorMessage: null,
        };
        const user1 = await this.findById({userId});
        const user2 = await this.findByNickname({userNickname});

        return new Promise((resolve, reject)=>{
            if(user1){
                const errorMessage = '이 아이디는 현재 사용중입니다. 다른 아이디를 입력해 주세요.';
                newUser.errorMessage=errorMessage;
                resolve(newUser);
            }
            else if(user2){
                const errorMessage = '이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요.';
                newUser.errorMessage = errorMessage;
                resolve(newUser);
            }
            else{
                const sql = `insert into User(userId,userName,userNickname,userPassword) values('${userId}','${userName}','${userNickname}','${hashedPassword}' )`;
                pool.query(sql, (error, results, fields) => {
                    if (error) {
                        newUser.errorMessage = error;
                        resolve(newUser);
                    }
                    else{
                        resolve(newUser);
                    }
                }); 
            }
            

        })
        
    }
    // userId 조회
    static async findById({ userId  }) {
        return new Promise((resolve, reject)=>{
            const sql = `select * from User where userId='${userId}'`;
            pool.query(sql, (error, results, fields)=>{
                if(error){
                    reject(error);
                }else{
                    const user = results[0];
                    resolve(user);
                }
            })
        })
    }
    // userNickname 조회
    static async findByNickname({ userNickname  }) {
        return new Promise((resolve, reject)=>{
            const sql = `select * from User where userNickname ='${userNickname}'`;
            pool.query(sql, (error, results, fields)=>{
                if(error){
                    reject(error);
                }else{
                    const user = results[0];
                    resolve(user);
                }
            })
        })
    }

    //로그인
    static async getUser({ userId, userPassword }) {
        const userFound = await this.findById({userId});
        let user ={
            userId, 
            errorMessage: null,
            token: null,
            userName: null,
            userNickname: null,
        };
        return new Promise((resolve, reject)=>{
            if(!userFound){
                user.errorMessage = '이 아이디는 가입내역이 없습니다. 다시 한 번 확인해주세요.';
                resolve(user);
            }
            else{
                bcrypt.compare(userPassword, userFound.userPassword, (error, result)=>{
                    if(!result){
                        user.errorMessage = '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
                        resolve(user);
                    }
                    else{
                        const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
                        const token = jwt.sign({ userId: user.userId }, secretKey);
                        user.token = token;
                        user.userName = userFound.userName;
                        user.userNickname = userFound.userNickname;
                        resolve(user);
                    }
                });
            }
        })
    }
    // 유저정보 수정
    static async setUser({ userId, newNickname, newPassword }) {
        const userFound = await this.findById({userId});
        const userNickname = await this.userNicknameUpdate({userFound, newNickname });
        const userPassword = await this.userPasswordUpdate({userFound, newPassword });

        let user ={
            userId, 
            userNickname,
            userPassword,
            errorMessage: null,
        };
    
        return new Promise((resolve, reject)=>{
            if(!userFound){
                user.errorMessage = '이 아이디는 가입내역이 없습니다. 다시 한 번 확인해주세요.';
                resolve(user);
            }
            else{
                let sql = `select * from User where userId='${userId}'`;
                pool.query(sql, (error, results, fields)=>{
                    let updatedUser = results[0];
                    updatedUser.errorMessage = null;
                    resolve(updatedUser);
                })
            }
        })
    }
    // 닉네임 업데이트
    static async userNicknameUpdate({ userFound, newNickname }) {
        
        return new Promise((resolve, reject)=>{
            if(userFound.userNickname !=  newNickname){
                const sql = `UPDATE User SET userNickname='${newNickname}' WHERE userId = '${userFound.userId}'`;
                pool.query(sql, (error, results, fields)=>{
                    if(error){
                        reject(error);
                    }
                    resolve(results);
                })
            }
            else{
                resolve();
            }
          }
        );
      }
    });
  }
  //update
  static async setUser({ userId, newNickname, newPassword }) {
    const userFound = await this.findById({ userId });
    const userNickname = await this.userNicknameUpdate({
      userFound,
      newNickname,
    });
    const userPassword = await this.userPasswordUpdate({
      userFound,
      newPassword,
    });

    return new Promise((resolve, reject) => {
      let user = {
        userId,
        userNickname,
        userPassword,
        errorMessage: null,
      };

      if (!userFound) {
        user.errorMessage =
          "이 아이디는 가입내역이 없습니다. 다시 한 번 확인해주세요.";
        resolve(user);
      } else {
        let sql = `select * from User where userId='${userId}'`;
        pool.query(sql, (error, results, fields) => {
          let updatedUser = results[0];
          updatedUser.errorMessage = null;
          resolve(updatedUser);
        });
      }
    });
  }
  // 닉네임 업데이트
  static async userNicknameUpdate({ userFound, newNickname }) {
    return new Promise((resolve, reject) => {
      if (userFound.userNickname != newNickname) {
        const sql = `UPDATE User SET userNickname='${newNickname}' WHERE userId = '${userFound.userId}'`;
        pool.query(sql, (error, results, fields) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      } else {
        resolve();
      }
    });
  }
  // 비밀번호 업데이트
  static async userPasswordUpdate({ userFound, newPassword }) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return new Promise((resolve, reject) => {
      const userPassword = userFound.userPassword;
      bcrypt.compare(newPassword, userPassword, (error, result) => {
        if (!result) {
          const sql = `UPDATE User SET userPassword='${hashedPassword}' WHERE userId = '${userFound.userId}'`;
          pool.query(sql, (error, results, fields) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          });
        }
        const userFound = await this.findById({userId});
        return new Promise((resolve, reject)=>{
            bcrypt.compare(userPassword, userFound.userPassword, (error, result)=>{
                if(result){//같으면
                    const sql = `DELETE from User WHERE userId = '${userId}'`;
                    pool.query(sql, (error, results, fields)=>{
                        if(error){
                            status.errorMessage = error;
                            resolve(status);
                        }
                        else{
                            status.message = '성공적으로 삭제되었습니다.';
                            resolve(status);
                        }
                    })
                }
                else{// 다르면
                    status.errorMessage = '입력한 비밀번호가 옳지 않습니다';
                    resolve(status);

                }
            })
            
            
        })

    ///////
    const user = await this.findById({ userId });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
}

export { userAuthService };
