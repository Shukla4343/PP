import React from "react";
import "../assets/css/style.css";
import logoMobile from "../assets/images/logo-mobile.svg";
import heroShape1 from "../assets/images/hero_shape_1.png";
import aboutLeftImage from "../assets/images/about_left.png";
import heroImage1 from "../assets/images/hero_img_1.jpeg";
import img1 from "../assets/images/icons/cel.png";
import img2 from "../assets/images/icons/daybest.png";
import img3 from "../assets/images/icons/adani.png";
import img4 from "../assets/images/icons/nayara.png";

function HomePage() {
  return (
    <div>
      {/* Start Hero Section */}
      <section className="cs_hero cs_style_1 position-relative" id="home">
        <div className="cs_hero_top cs_bg_filled cs_primary_bg">
          <div className="container">
            <div className="row cs_gap_y_30 align-items-center">
              <div className="col-lg-6">
                <div className="cs_hero_text">
                  <a href="https://www.indowings.com/">
                    <img
                      src={logoMobile}
                      style={{ height: "70px" }}
                      alt="Logo"
                    />
                  </a>
                  <br />
                  <br />
                  <h1 className="cs_hero_title cs_fs_60 cs_semibold cs_white_color wow fadeInDown">
                    Become our Channel Partner
                  </h1>
                  <p className="cs_hero_subtitle cs_fs_18 cs_white_color">
                    Please fill out our initial questionnaire. A member of Indo
                    Wings staff will contact you to discuss the next steps.
                  </p>
                  <a
                    href="/portal"
                    className="cs_btn cs_style_1 cs_fs_18 cs_semibold cs_accent_bg_v1 cs_white_color"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="cs_btn cs_style_1 cs_fs_18 cs_semibold cs_accent_bg_v4 cs_white_color"
                    style={{ marginLeft: "10px" }}
                  >
                    Register
                  </a>
                </div>
                <div className="cs_hero_shape1 position-absolute">
                  <img src={heroShape1} alt="Hero Shape" />
                </div>
              </div>
              <div className="col-lg-6">
                <a href="https://www.indowings.com/">
                  <div
                    className="cs_hero_thumb cs_bg_filled"
                    style={{ backgroundImage: `url(${heroImage1})` }}
                  ></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_hero_bottom cs_accent_v1_light">
          <div className="container">
            <h2 className="cs_hero_title cs_fs_40 cs_semibold text-center mb-0">
              Join our network of Channel Partners!
            </h2>
            <div className="cs_height_50 cs_height_lg_30"></div>
            <div className="cs_features_list cs_style_1">
              <div className="cs_iconbox cs_style_1">
                <div className="cs_iconbox_icon">
                  <img src={img1} alt="Logo" />
                </div>
              </div>
              <div className="cs_iconbox cs_style_1">
                <div className="cs_iconbox_icon">
                  <img src={img2} alt="Logo" />
                </div>
              </div>
              <div className="cs_iconbox cs_style_1">
                <div className="cs_iconbox_icon">
                  <img src={img3} alt="Logo" />
                </div>
              </div>
              <div className="cs_iconbox cs_style_1">
                <div className="cs_iconbox_icon">
                  <img src={img4} alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Hero Section */}

      {/* Start About Section */}
      <section className="cs_about cs_style_1" id="about">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="row cs_gap_y_40 align-items-center">
            <div className="col-lg-6">
              <div className="cs_about_thumb wow fadeInLeft">
                <img src={aboutLeftImage} alt="About Thumb" />
              </div>
            </div>
            <div className="col-lg-6 cs_pl_30">
              <div className="cs_section_heading cs_style_1">
                <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_18">
                  Indo Wings
                </h3>
                <h2 className="cs_section_title cs_semibold cs_fs_35 mb-0">
                  Indo Wings Channel Partner form a trusted global extension of
                  Indo Wings by representing our brand and selling our products
                  in the markets that they know best.
                </h2>
              </div>
              <div className="cs_height_32 cs_height_lg_20"></div>
              <p className="cs_about_text">
                Industry leader in professional drone mapping and
                photogrammetric software solutions. Their tools transform raw
                digital imagery into georeferenced 2D mosaics, 3D models, and
                more.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End About Section */}

      {/* Start Services Section */}
      <section id="services">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <h3 className="cs_section_title_up cs_accent_color_v1 cs_semibold cs_fs_24">
              {" "}
              Channel Partner{" "}
            </h3>
            <h2 className="cs_section_title cs_semibold cs_fs_45 wow fadeInUp mb-0">
              Interested in joining the global network <br />
              of Indowings partners?
            </h2>
          </div>
          <div className="cs_height_63 cs_height_lg_40"></div>
        </div>
        <div className="container">
          <div className="cs_tabs">
            <div className="tab-content">
              <div id="x_ray" className="cs_tab active">
                <div className="cs_card cs_style_1 cs_white_bg cs_radius_5">
                  <div className="row cs_gap_y_20">
                    <div className="col-lg-12">
                      <div className="cs_card_text">
                        <h2 className="cs_card_title cs_fs_35 cs_semibold">
                          Indo Wings Channel Partner
                        </h2>
                        <p className="cs_card_subtitle">
                          Indo Wings Channel Partner form a trusted global
                          extension of Indo Wings by representing us in the
                          regions and languages that they know best.
                        </p>
                        <p className="cs_card_subtitle">
                          We dedicate a lot of effort to building and
                          maintaining strong working partnerships. As a result,
                          we trust our Channel Partner to be fully committed to
                          actively selling and promoting Indo Wings. They are in
                          regular contact with us to help develop our regional
                          sales strategies.
                        </p>
                        <p className="cs_card_subtitle">
                          Does this sound like an appealing and realistic
                          opportunity for your company?
                        </p>
                        <div className="row cs_gap_y_20">
                          <div className="col-lg-3">
                            <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">
                              What Indo Wings offers
                            </h3>
                            <ul className="cs_list cs_style_1 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                              {/* List items */}
                            </ul>
                          </div>
                          <div className="col-lg-3">
                            <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">
                              Commitment is required
                            </h3>
                            <ul className="cs_list cs_style_1 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                              {/* List items */}
                            </ul>
                          </div>
                          <div className="col-lg-3">
                            <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">
                              Concept of Partnership
                            </h3>
                            <ul className="cs_list cs_style_1 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                              {/* List items */}
                            </ul>
                          </div>
                          <div className="col-lg-3">
                            <h3 className="cs_list_title cs_fs_20 cs_bold cs_accent_color_v1">
                              Potential
                            </h3>
                            <ul className="cs_list cs_style_1 cs_mp0 cs_fs_18 cs_primary_color cs_semibold">
                              {/* List items */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>
      {/* End Services Section */}

      {/* Start footer */}
      <footer
        className="cs_footer cs_style_1 cs_bg_filed cs_primary_bg"
        data-src="assets/images/footer_bg.jpeg"
      >
        <div className="cs_footer_bottom">
          <div className="container">
            <div className="cs_footer_bottom_text">
              <div className="cs-copyright cs_fs_18 cs_white_color">
                All Right Reserved Copyright &copy; 2024
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End footer */}
    </div>
  );
}

export default HomePage;
