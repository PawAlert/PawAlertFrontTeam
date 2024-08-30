<template>
  <footer class="footer">
    <v-container>
      <v-row class="footer-content">
        <v-col cols="12" md="5" class="left-section">
          <Logo class="logo"/>
          <h3 class="update-heading">Updates right to your Inbox</h3>
          <v-row class="email-subscription">
            <v-text-field
                class="email-input"
                placeholder="Enter your email"
                prepend-inner-icon="mdi-email"
                outlined
                dense
            ></v-text-field>
            <v-btn class="subscribe-btn" elevation="2">
              Subscribe
            </v-btn>
          </v-row>
          <v-row class="footer-info">
            <v-img
                src="@/assets/images/FooterImage_1.png"
                width="1"
                height="20"
                class="footer-icon"
            ></v-img>
            <span class="copyright mx-2">PawAlert 2024</span>
            <v-divider vertical class="mx-2"></v-divider>
            <a href="#" class="footer-link">Privacy Policy</a>
            <v-divider vertical class="mx-2"></v-divider>
            <a href="#" class="footer-link mx-2">Terms of Use</a>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>

        <v-col cols="12" md="7" class="right-section">
          <v-row>
            <v-col v-for="(column, index) in footerLinks" :key="index" cols="1" class="footerLinks">
              <h4 class="column-title">{{ column.title }}</h4>
              <ul class="link-list">
                <li v-for="(link, linkIndex) in column.links" :key="linkIndex">
                  <a href="#" class="footer-link ">{{ link }}</a>
                </li>
              </ul>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-4 social-icons">
            <v-btn v-for="icon in socialIcons" :key="icon" icon class="mx-7">
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script setup>
  import Logo from "@/components/layout/Logo.vue";

  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press"],
    },
    {
      title: "Support",
      links: ["Help Center", "Safety Center", "Community Guidelines"],
    },
    {
      title: "Legal",
      links: ["Cookies Policy", "Intellectual Property", "Privacy Policy"],
    },
  ];

  const socialIcons = [
    "mdi-facebook",
    "mdi-twitter",
    "mdi-instagram",
    "mdi-linkedin",
  ];
</script>

<style scoped>
  .footerLinks {
    margin-left: 150px;
  }

  .footer {
    background-color: #FFFFFF;
    padding: 60px 0;
    color: #2d2d2d;
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
  }

  .left-section {
    display: flex;
    flex-direction: column;
  }

  .logo {
    max-width: 200px;
    margin-left: 15px;
    margin-bottom: 20px;
  }

  .update-heading {
    margin-left: 32px;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .email-subscription {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .email-input {
    margin-left: 40px;
    flex-grow: 1;
    margin-right: 10px;
  }

  .subscribe-btn {
    background-color: #3366FF;
    margin-top: -20px;
    width: 116px;
    height: 54px;
    text-transform: none;
  }

  .footer-info {
    margin-left: 120px;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  }

  .footer-icon {
    margin-left: -130px;
    margin-right: -50px;
  }

  .copyright {
    margin-right: 10px;
  }

  .footer-link {
    color: #2d2d2d;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #3366ff;
  }


  .right-section {
    display: flex;
    flex-direction: column;
  }

  .column-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .link-list {
    list-style-type: none;
    padding: 0;
  }

  .link-list li {
    margin-bottom: 10px;
  }

  .social-icons {
    margin-top: 30px;
  }

  .social-icons .v-btn {
    background-color: #e0e5ee;
  }

  @media (max-width: 960px) {
    .footer-content {
      flex-direction: column;
    }

    .left-section,
    .right-section {
      width: 100%;
    }

    .right-section {
      margin-top: 40px;
    }

  }
</style>