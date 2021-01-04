const common_passwords = [
  "123456",
  "password",
  "12345678",
  "qwerty",
  "123456789",
  "12345",
  "111111",
  "1234567",
  "dragon",
  "123123",
  "baseball",
  "abc123",
  "football",
  "letmein",
  "monkey",
  "696969",
  "shadow",
  "master",
  "666666",
  "qwertyuiop",
  "123321",
];

const MAX_POINTS = 100;
const CONTAINS_ALPHANUMERIC = 3;
const CONTAINS_SPECIAL_CHAR = 1;
const CONTAINS_NUMBER = 1;
const LENGTH_MULTIPLIER = 1.2;

class RealPassword {
  state = {
    password: "",
    alert: "",
  };

  setPassword(password) {
    this.setState({ password: password });
    this.state.password = password;
  }

  hasAlpha() {
    return /[a-z]/.test(this.state.password);
  }

  hasCapitalAlpha() {
    return /[A-Z]/.test(this.state.password);
  }

  hasSpecialChar() {
    return /\W|_/g.test(this.state.password);
  }
  hasNumber() {
    return /\d/.test(this.state.password);
  }

  countPointsNumber() {
    return this.hasNumber() ? CONTAINS_NUMBER : 0;
  }

  countPointsSpecialChar() {
    return this.hasSpecialChar() ? CONTAINS_SPECIAL_CHAR : 0;
  }

  countPointsAlphanumeric() {
    return this.hasAlpha() ? CONTAINS_ALPHANUMERIC : 0;
  }

  setAlert() {
    if (this.isCommonPassword()) {
      this.setState({
        alert: "Password is in the list of 100.000 most used passwords!",
      });
    }
    console.log(this.state.alert);
  }

  isCommonPassword() {
    return common_passwords.indexOf(this.state.password) > -1 ? 0 : 1;
  }

  getPoints() {
    return (this.countPointsSpecialChar() +
      this.countPointsAlphanumeric() +
      this.hasCapitalAlpha() +
      this.countPointsNumber()) *
      Math.pow(this.state.password.length, LENGTH_MULTIPLIER) *
      this.isCommonPassword() >
      MAX_POINTS
      ? MAX_POINTS
      : (this.countPointsSpecialChar() +
          this.countPointsAlphanumeric() +
          this.hasCapitalAlpha() +
          this.countPointsNumber()) *
          Math.pow(this.state.password.length, LENGTH_MULTIPLIER) *
          this.isCommonPassword();
  }
}

export default RealPassword;
