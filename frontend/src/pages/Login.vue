<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div v-else>
    <p v-if="!!message">{{ message }}</p>
    <p v-if="!!error" class="error">{{ error }}</p>
    <base-card class="base-card">
      <form @submit.prevent="submitForm">
        <!-- signup -->
        <base-form-input
          v-if="mode === 'signup'"
          label="Name"
          v-model.trim="formData.name"
          :invalid="invalid.name"
          invalid-message="Please enter a valid name."
        ></base-form-input>
        <base-form-input
          v-if="mode === 'signup'"
          label="Email"
          type="email"
          v-model.trim="formData.email"
          :invalid="invalid.email"
          invalid-message="Please enter a valid email."
        ></base-form-input>
        <base-form-input
          v-if="mode === 'signup'"
          label="Password"
          type="password"
          v-model.trim="formData.password"
          :invalid="invalid.password"
          invalid-message="Passwords must be at least 6 characters long."
        ></base-form-input>
        <base-form-input
          v-if="mode === 'signup'"
          label="Repeat Password"
          type="password"
          v-model.trim="formData.repeatPassword"
          :invalid="invalid.repeatPassword"
          invalid-message="Passwords must match."
        ></base-form-input>
        <!-- end signup -->
        <!-- login -->
        <base-form-input
          v-if="mode === 'login'"
          label="Email"
          type="email"
          v-model.trim="formData.email"
          :invalid="invalid.email"
          invalid-message="Please enter a valid email."
        ></base-form-input>
        <base-form-input
          v-if="mode === 'login'"
          label="Password"
          type="password"
          v-model.trim="formData.password"
          :invalid="invalid.password"
          invalid-message="Passwords must be at least 6 characters long."
        ></base-form-input>
        <!-- end login -->
        <div>
          <base-button>{{ submitButtonCaption }}</base-button>
        </div>
        <div>
          <base-button type="button" mode="flat" @click="switchAuthMode">
            {{ switchModeButtonCaption }}
          </base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseFormInput from "../components/ui/BaseFormInput";

export default {
  components: { BaseFormInput },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
      mode: "login",
      message: "",
      error: "",
      isLoading: false,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login"
        ? this.formData.email === "" && this.formData.password === ""
          ? "Log in as Guest"
          : "Log In"
        : "Sign Up";
    },
    switchModeButtonCaption() {
      return this.mode === "login"
        ? "New user? Sign up"
        : "Already have an account? Log in";
    },
    invalid() {
      return {
        name: this.formData.name.length === 0 && this.mode === "signup",
        email: !this.formData.email.includes("@"),
        password: this.formData.password.length < 6,
        repeatPassword:
          (this.formData.repeatPassword.length < 6 ||
            this.formData.repeatPassword != this.formData.password) &&
          this.formData.mode === "signup",
      };
    },
    formIsInvalid() {
      if (
        this.mode === "login" &&
        this.formData.email === "" &&
        this.formData.password === ""
      ) {
        return false;
      }
      return (
        this.invalid.name ||
        this.invalid.email ||
        this.invalid.password ||
        this.invalid.repeatPassword
      );
    },
  },
  methods: {
    async submitForm() {
      if (this.formIsInvalid) {
        return;
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch(this.mode, this.formData);

        if (this.mode === "signup") {
          this.clearForm();
          this.mode = "login";
          this.message = "Signup successful. Login to start cooking!";
        } else {
          this.$router.replace("/recipes");
        }
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      this.clearForm();
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    clearForm() {
      this.formData.name = "";
      this.formData.email = "";
      this.formData.password = "";
      this.formData.repeatPassword = "";
    },
  },
};
</script>

<style scoped>
.base-card {
  background-color: #fff3e4;
}

form > div {
  margin-top: 10px;
}

form > div:nth-child(1) {
  margin-top: 0px;
}

p.error {
  color: rgb(253, 74, 74);
}
</style>
