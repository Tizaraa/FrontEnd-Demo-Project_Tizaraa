"use client";

import Head from "next/head";
import Link from "next/link";
import "../terms-and-conditions/terms.css";
import { useState } from "react";

export default function TermsAndConditions() {
 const [language, setLanguage] = useState("english");

 return (
  <div className="terms-container">
   <Head>
    <title>Terms & Conditions | Tizaraa</title>
    <meta name="description" content="Tizaraa Terms and Conditions" />
   </Head>

   <div className="terms-content">
    {/* Header */}
    <div className="terms-header">
     <h1 className="terms-title">TERMS & CONDITIONS</h1>
     <div className="terms-divider"></div>
     <p className="terms-last-updated">
      Last Updated:{" "}
      {new Date().toLocaleDateString("en-US", {
       year: "numeric",
       month: "long",
       day: "numeric",
      })}
     </p>
    </div>

    <div className="btn-header">
     <button
      className={`tab-button ${language === "english" ? "active" : ""}`}
      onClick={() => setLanguage("english")}
     >
      English
     </button>
     <button
      className={`tab-button ${language === "bangla" ? "active" : ""}`}
      onClick={() => setLanguage("bangla")}
     >
      বাংলা
     </button>
    </div>

    {/* Content English */}
    {language === "english" && (
     <div className="terms-body">
      {/* Introduction */}
      <section id="introduction" className="section">
       <div className="section-content">
        <p>
         Tizaraa is an e-commerce marketplace with the goal to provide premium
         online shopping experience to customers.
        </p>
        <p>
         These Terms of Use constitute a legally binding agreement made between
         you, whether personally or on behalf of an entity ("you") and Tizaraa,
         doing business as Tizaraa ("Tizaraa", "we", "us", or "our"), concerning
         your access to and use of the http://tizaraa.com website as well as any
         other media form, media channel, mobile website or mobile application
         related, linked, or otherwise connected thereto (collectively, the
         "Site"). You agree that by accessing the Site, you have read,
         understood, and agreed to be bound by all of these Terms of Use. If you
         do not agree with all of these terms of use, then you are expressly
         prohibited from using the site and you must discontinue use
         immediately.
        </p>
        <p>
         Supplemental terms and conditions or documents that may be posted on
         the Site from time to time are hereby expressly incorporated herein by
         reference. We reserve the right, in our sole discretion, to make
         changes or modifications to these Terms of Use at any time and for any
         reason. We will alert you about any changes by updating the "Last
         Updated" date of these Terms of Use, and you waive any right to receive
         specific notice of each such change. It is your responsibility to
         periodically review these Terms of Use to stay informed of updates. You
         will be subject to, and will be deemed to have been made aware of and
         to have accepted, the changes in any revised Terms of Use by your
         continued use of the Site after the date such revised Terms of Use are
         posted.
        </p>
        <p>
         The information provided on the Site is not intended for distribution
         to or use by any person or entity in any jurisdiction or country where
         such distribution or use would be contrary to law or regulation or
         which would subject us to any registration requirement within such
         jurisdiction or country. Accordingly, those persons who choose to
         access the Site from other locations do so on their own initiative and
         are solely responsible for compliance with local laws, if and to the
         extent local laws are applicable.
        </p>
        <p>
         All users who are minors in the jurisdiction in which they reside
         (generally under the age of 18) must have the permission of, and be
         directly supervised by, their parent or guardian to use the Site. If
         you are a minor, you must have your parent or guardian read and agree
         to these Terms of Use prior to you using the Site.
        </p>
       </div>
      </section>

      {/* Intellectual Property Rights */}
      <section id="ip-rights" className="section">
       <h2 className="section-title">
        <span className="section-number">1</span>
        INTELLECTUAL PROPERTY RIGHTS
       </h2>
       <div className="section-content">
        <p>
         Unless otherwise indicated, the Site is our proprietary property and
         all source code, databases, functionality, software, website designs,
         audio, video, text, photographs, and graphics on the Site
         (collectively, the "Content") and the trademarks, service marks, and
         logos contained therein (the "Marks") are owned or controlled by us or
         licensed to us. The Content and the Marks are provided on the Site "AS
         IS" for your information and personal use only. Except as expressly
         provided in these Terms of Use, no part of the Site and no Content or
         Marks may be copied, reproduced, aggregated, republished, uploaded,
         posted, publicly displayed, encoded, translated, transmitted,
         distributed, sold, licensed, or otherwise exploited for any commercial
         purpose whatsoever, without our express prior written permission.
        </p>
        <p>
         Provided that you are eligible to use the Site, you are granted a
         limited license to access and use the Site and to download or print a
         copy of any portion of the Content to which you have properly gained
         access solely for your personal, non-commercial use. We reserve all
         rights not expressly granted to you in and to the Site, the Content and
         the Marks.
        </p>
       </div>
      </section>

      {/* User Representations */}
      <section id="user-rep" className="section">
       <h2 className="section-title">
        <span className="section-number">2</span>
        USER REPRESENTATIONS
       </h2>
       <div className="section-content">
        <p>By using the Site, you represent and warrant that:</p>
        <ol>
         <li>
          All registration information you submit will be true, accurate,
          current, and complete
         </li>
         <li>
          You will maintain the accuracy of such information and promptly update
          such registration information as necessary
         </li>
         <li>
          You have the legal capacity and you agree to comply with these terms
          of use
         </li>
         <li>
          You are not a minor in the jurisdiction in which you reside, or if a
          minor, you have received parental permission to use the site
         </li>
         <li>
          You will not access the site through automated or non-human means,
          whether through a bot, script or otherwise
         </li>
         <li>
          You will not use the site for any illegal or unauthorized purpose
         </li>
         <li>
          Your use of the site will not violate any applicable law or
          regulation.
         </li>
        </ol>
        <p>
         If you provide any information that is untrue, inaccurate, not current,
         or incomplete, we have the right to suspend or terminate your account
         and refuse any and all current or future use of the Site (or any
         portion thereof).
        </p>
       </div>
      </section>

      {/* User Registration */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">3</span>
        USER REGISTRATION
       </h2>
       <div className="section-content">
        <p>
         You may be required to register with the Site. You agree to keep your
         password confidential and will be responsible for all use of your
         account and password. We reserve the right to remove, reclaim, or
         change the username you select if we determine, in our sole discretion,
         that such username is inappropriate, obscene, or otherwise
         objectionable.
        </p>
       </div>
      </section>

      {/* PROHIBITED ACTIVITIES */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">4</span>
        PROHIBITED ACTIVITIES
       </h2>
       <div className="section-content">
        <p>
         You may not access or use the Site for any purpose other than that for
         which we make the Site available. The Site may not be used in
         connection with any commercial endeavors except those that are
         specifically endorsed or approved by us.
        </p>

        <p>As a user of the Site, you agree not to:</p>

        <ol>
         <li>
          Systematically retrieve data or other content from the Site to create
          or compile, directly or indirectly, a collection, compilation,
          database, or directory without written permission from us.
         </li>
        </ol>
       </div>
      </section>

      {/* CONTRIBUTION LICENSE */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">5</span>
        CONTRIBUTION LICENSE
       </h2>
       <div className="section-content">
        <p>
         By posting your Contributions to any part of the Site or making
         Contributions accessible to the Site by linking your account from the
         Site to any of your social networking accounts, you automatically
         grant, and you represent and warrant that you have the right to grant,
         to us an unrestricted, unlimited, irrevocable, perpetual,
         non-exclusive, transferable, royalty-free, fully-paid, worldwide right,
         and license to host, use, copy, reproduce, disclose, sell, resell,
         publish, broadcast, retitle, archive, store, cache, publicly perform,
         publicly display, reformat, translate, transmit, excerpt (in whole or
         in part), and distribute such Contributions (including, without
         limitation, your image and voice) for any purpose, commercial,
         advertising, or otherwise, and to prepare derivative works of, or
         incorporate into other works, such Contributions, and grant and
         authorize sublicenses of the foregoing. The use and distribution may
         occur in any media format and through any media channel.
        </p>

        <p>
         This license will apply to any form, media, or technology now known or
         hereafter developed, and includes our use of your name, company name,
         and franchise name, as applicable, and any of the trademarks, service
         marks, trade names, logos, and personal and commercial images you
         provide. You waive all moral rights in your Contributions, and you
         warrant that moral rights have not otherwise been asserted in your
         Contributions.
        </p>

        <p>
         We do not assert any ownership over your Contributions. You retain full
         ownership of all of your Contributions and any intellectual property
         rights or other proprietary rights associated with your Contributions.
         We are not liable for any statements or representations in your
         Contributions provided by you in any area on the Site. You are solely
         responsible for your Contributions to the Site and you expressly agree
         to exonerate us from any and all responsibility and to refrain from any
         legal action against us regarding your Contributions.
        </p>

        <p>We have the right, in our sole and absolute discretion,</p>

        <ol>
         <li>To edit, redact, or otherwise change any Contributions</li>
         <li>
          To re-categorize any Contributions to place them in more appropriate
          locations on the Site
         </li>
         <li>
          To pre-screen or delete any Contributions at any time and for any
          reason, without notice. We have no obligation to monitor your
          Contributions.
         </li>
        </ol>
       </div>
      </section>

      {/* GUIDELINES FOR REVIEWS */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">6</span>
        GUIDELINES FOR REVIEWS
       </h2>
       <div className="section-content">
        <p>
         We may provide you areas on the Site to leave reviews or ratings. When
         posting a review, you must comply with the following criteria:
        </p>

        <ol>
         <li>
          You should have firsthand experience with the person/entity being
          reviewed
         </li>
         <li>
          Your reviews should not contain offensive profanity, or abusive,
          racist, offensive, or hate language
         </li>
         <li>
          Your reviews should not contain discriminatory references based on
          religion, race, gender, national origin, age, marital status, sexual
          orientation, or disability
         </li>
         <li>Your reviews should not contain references to illegal activity</li>
         <li>
          You should not be affiliated with competitors if posting a negative
          review
         </li>
         <li>
          You should not make any conclusions as to the legality of conduct
         </li>
         <li>You may not post any false or misleading statements</li>
         <li>
          You may not organize a campaign encouraging others to post reviews,
          whether positive or negative.
         </li>
        </ol>

        <p>
         We may accept, reject, or remove reviews at our sole discretion. We
         have absolutely no obligation to screen reviews or to delete reviews,
         even if anyone considers reviews objectionable or inaccurate. Reviews
         are not endorsed by us and do not necessarily represent our opinions or
         the views of any of our affiliates or partners. We do not assume
         liability for any review or for any claims, liabilities, or losses
         resulting from any review. By posting a review, you hereby grant to us
         a perpetual, non-exclusive, worldwide, royalty-free, fully-paid,
         assignable, and sublicensable right and license to reproduce, modify,
         translate, transmit by any means, display, perform, and/or distribute
         all content relating to reviews.
        </p>
       </div>
      </section>

      {/* MOBILE APPLICATION LICENSE */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">7</span>
        MOBILE APPLICATION LICENSE
       </h2>
       <div className="section-content">
        <h3 className="subsection-title">Use License</h3>
        <p>
         If you access the Site via a mobile application, then we grant you a
         revocable, non-exclusive, non-transferable, limited right to install
         and use the mobile application on wireless electronic devices owned or
         controlled by you, and to access and use the mobile application on such
         devices strictly in accordance with the terms and conditions of this
         mobile application license contained in these Terms of Use. You shall
         not:
        </p>

        <ol>
         <li>
          Decompile, reverse engineer, disassemble, and attempt to derive the
          source code of, or decrypt the application
         </li>
         <li>
          Make any modification, adaptation, improvement, enhancement,
          translation, or derivative work from the application
         </li>
         <li>
          Violate any applicable laws, rules, or regulations in connection with
          your access or use of the application
         </li>
         <li>
          Remove, alter, or obscure any proprietary notice (including any notice
          of copyright or trademark) posted by us or the licensors of the
          application
         </li>
         <li>
          Use the application for any revenue-generating endeavor, commercial
          enterprise, or other purposes for which it is not designed or intended
         </li>
         <li>
          Make the application available over a network or other environment
          permitting access or use by multiple devices or users at the same time
         </li>
         <li>
          Use the application for creating a product, service, or software that
          is, directly or indirectly, competitive with or in any way a
          substitute for the application
         </li>
         <li>
          Use the application to send automated queries to any website or to
          send any unsolicited commercial e-mail
         </li>
         <li>
          Use any proprietary information or any of our interfaces or our other
          intellectual property in the design, development, manufacture,
          licensing, or distribution of any applications, accessories, or
          devices for use with the application.
         </li>
        </ol>
       </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">8</span>
        SOCIAL MEDIA
       </h2>
       <div className="section-content">
        <p>
         As part of the functionality of the Site, you may link your account
         with online accounts you have with third-party service providers (each
         such account, a "Third-Party Account") by either:
        </p>

        <ol>
         <li>
          Providing your Third-Party Account login information through the Site
         </li>
         <li>
          Allowing us to access your Third-Party Account, as is permitted under
          the applicable terms and conditions that govern your use of each
          Third-Party Account. You represent and warrant that you are entitled
          to disclose your Third-Party Account login information to us and/or
          grant us access to your Third-Party Account, without breach by you of
          any of the terms and conditions that govern your use of the applicable
          Third-Party Account, and without obligating us to pay any fees or
          making us subject to any usage limitations imposed by the third-party
          service provider of the Third-Party Account.
         </li>
        </ol>

        <p>
         By granting us access to any Third-Party Accounts, you understand that
        </p>

        <ol>
         <li>
          We may access, make available, and store (if applicable) any content
          that you have provided to and stored in your Third-Party Account (the
          "Social Network Content") so that it is available on and through the
          Site via your account, including without limitation any friend lists
         </li>
         <li>
          We may submit to and receive from your Third-Party Account additional
          information to the extent you are notified when you link your account
          with the Third-Party Account. Depending on the Third-Party Accounts
          you choose and subject to the privacy settings that you have set in
          such Third-Party Accounts, personally identifiable information that
          you post to your Third-Party Accounts may be available on and through
          your account on the Site. Please note that if a Third-Party Account or
          associated service becomes unavailable or our access to such
          Third-Party Account is terminated by the third-party service provider,
          then Social Network Content may no longer be available on and through
          the Site.
         </li>
        </ol>

        <p>
         You will have the ability to disable the connection between your
         account on the Site and your Third-Party Accounts at any time. PLEASE
         NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS
         ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR
         AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort
         to review any Social Network Content for any purpose, including but not
         limited to, for accuracy, legality, or non-infringement, and we are not
         responsible for any Social Network Content. You acknowledge and agree
         that we may access your email address book associated with a
         Third-Party Account and your contacts list stored on your mobile device
         or tablet computer solely for purposes of identifying and informing you
         of those contacts who have also registered to use the Site. You can
         deactivate the connection between the Site and your Third-Party Account
         by contacting us using the contact information below or through your
         account settings (if applicable). We will attempt to delete any
         information stored on our servers that was obtained through such
         Third-Party Account, except the username and profile picture that
         become associated with your account.
        </p>
       </div>
      </section>

      {/* SUBMISSIONS */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">9</span>
        SUBMISSIONS
       </h2>
       <div className="section-content">
        <p>
         You acknowledge and agree that any questions, comments, suggestions,
         ideas, feedback, or other information regarding the Site
         ("Submissions") provided by you to us are non-confidential and shall
         become our sole property. We shall own exclusive rights, including all
         intellectual property rights, and shall be entitled to the unrestricted
         use and dissemination of these Submissions for any lawful purpose,
         commercial or otherwise, without acknowledgment or compensation to you.
         You hereby waive all moral rights to any such Submissions and you
         hereby warrant that any such Submissions are original with you or that
         you have the right to submit such Submissions. You agree there shall be
         no recourse against us for any alleged or actual infringement or
         misappropriation of any proprietary right in your Submissions.
        </p>
       </div>
      </section>

      {/* THIRD-PARTY WEBSITE AND CONTENT */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">10</span>
        THIRD-PARTY WEBSITE AND CONTENT
       </h2>
       <div className="section-content">
        <p>
         The Site may contain (or you may be sent via the Site) links to other
         websites ("Third-Party Websites") as well as articles, photographs,
         text, graphics, pictures, designs, music, sound, video, information,
         applications, software, and other content or items belonging to or
         originating from third parties ("Third-Party Content"). Such
         Third-Party Websites and Third-Party Content are not investigated,
         monitored, or checked for accuracy, appropriateness, or completeness by
         us, and we are not responsible for any Third-Party Websites accessed
         through the Site or any Third-Party Content posted on, available
         through, or installed from the Site, including the content, accuracy,
         offensiveness, opinions, reliability, privacy practices, or other
         policies of or contained in the Third-Party Websites or the Third-Party
         Content.
        </p>
        <p>
         Inclusion of, linking to, or permitting the use or installation of any
         Third-Party Websites or any Third-Party Content does not imply approval
         or endorsement thereof by us. If you decide to leave the Site and
         access the Third-Party Websites or to use or install any Third-Party
         Content, you do so at your own risk and you should be aware these Terms
         of Use no longer govern. You should review the applicable terms and
         policies, including privacy and data gathering practices, of any
         website to which you navigate from the Site or relating to any
         applications you use or install from the Site.
        </p>
        <p>
         Any purchases you make through Third-Party Websites will be through
         other websites and from other companies and we take no responsibility
         whatsoever in relation to such purchases which are exclusively between
         you and the applicable third party. You agree and acknowledge that we
         do not endorse the products or services offered on Third-Party Websites
         and you shall hold us harmless from any harm caused by your purchase of
         such products or services. Additionally, you shall hold us harmless
         from any losses sustained by you or harm caused to you relating to or
         resulting in any way from any Third-Party Content or any contact with
         Third-Party Websites.
        </p>
       </div>
      </section>

      {/* SITE MANAGEMENT */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">11</span>
        SITE MANAGEMENT
       </h2>
       <div className="section-content">
        <p>We reserve the right, but not the obligation, to:</p>

        <ol>
         <li>Monitor the Site for violations of these Terms of Use</li>
         <li>
          Take appropriate legal action against anyone who, in our sole
          discretion violates the law or these Terms of Use, including without
          limitation, reporting such user to law enforcement authorities
         </li>
         <li>
          In our sole discretion and without limitation, refuse, restrict access
          to, limit the availability of, or disable (to the extent
          technologically feasible) any of your Contributions or any portion
          thereof
         </li>
         <li>
          In our sole discretion and without limitation, notice, or liability,
          to remove from the Site or otherwise disable all files and content
          that is excessive in size or is in any way burdensome to our systems
         </li>
         <li>
          Otherwise, manage the Site in a manner designed to protect our rights
          and property and to facilitate the proper functioning of the Site.
         </li>
        </ol>
       </div>
      </section>

      {/* PRIVACY POLICY */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">12</span>
        PRIVACY POLICY
       </h2>
       <div className="section-content">
        <p>
         We care about data privacy and security. By using the Site, you agree
         to be bound by our Privacy Policy posted on the Site, which is
         incorporated into these Terms of Use. Please be advised the Site is
         hosted in Bangladesh. If you access the Site from any other region of
         the world with laws or other requirements governing personal data
         collection, use, or disclosure that differ from applicable laws in
         Bangladesh, then through your continued use of the Site, you are
         transferring your data to Bangladesh, and you agree to have your data
         transferred to and processed in Bangladesh. Please review our Privacy
         policy.
        </p>
       </div>
      </section>

      {/* COPYRIGHT INFRINGEMENTS */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">13</span>
        COPYRIGHT INFRINGEMENTS
       </h2>
       <div className="section-content">
        <p>
         We respect the intellectual property rights of others. If you believe
         that any material available on or through the Site infringes upon any
         copyright you own or control, please immediately notify us using the
         contact information provided below (a "Notification"). A copy of your
         Notification will be sent to the person who posted or stored the
         material addressed in the Notification. Please be advised that pursuant
         to applicable law you may be held liable for damages if you make
         material misrepresentations in a Notification. Thus, if you are not
         sure that material located on or linked to by the Site infringes your
         copyright, you should consider first contacting an attorney.
        </p>
       </div>
      </section>

      {/* TERM AND TERMINATION */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">14</span>
        TERM AND TERMINATION
       </h2>
       <div className="section-content">
        <p>
         These terms of Use shall remain in full force and effect while you use
         the site. without limiting any other provision of these terms of use,
         we reserve the right to, in our sole discretion and without notice or
         liability, deny access to and use of the site (including blocking
         certain IP addresses), to any person for any reason or for no reason,
         including without limitation for breach of any representation,
         warranty, or covenant contained in these terms of use or of any
         applicable law or regulation. We may terminate your use or
         participation in the site or delete your account and any content or
         information that you posted at any time, without warning, in our sole
         discretion.
        </p>
        <p>
         If we terminate or suspend your account for any reason, you are
         prohibited from registering and creating a new account under your name,
         a fake or borrowed name, or the name of any third party, even if you
         may be acting on behalf of the third party. In addition to terminating
         or suspending your account, we reserve the right to take appropriate
         legal action, including without limitation pursuing civil, criminal,
         and injunctive redress.
        </p>
       </div>
      </section>

      {/* MODIFICATIONS AND INTERRUPTIONS */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">15</span>
        MODIFICATIONS AND INTERRUPTIONS
       </h2>
       <div className="section-content">
        <p>
         We reserve the right to change, modify, or remove the contents of the
         Site at any time or for any reason at our sole discretion without
         notice. However, we have no obligation to update any information on our
         Site. We also reserve the right to modify or discontinue all or part of
         the Site without notice at any time. We will not be liable to you or
         any third party for any modification, price change, suspension, or
         discontinuance of the Site. We cannot guarantee the Site will be
         available at all times. We may experience hardware, software, or other
         problems or need to perform maintenance related to the Site, resulting
         in interruptions, delays, or errors.
        </p>
        <p>
         We reserve the right to change, revise, update, suspend, discontinue,
         or otherwise modify the Site at any time or for any reason without
         notice to you. You agree that we have no liability whatsoever for any
         loss, damage, or inconvenience caused by your inability to access or
         use the Site during any downtime or discontinuance of the Site. Nothing
         in these Terms of Use will be construed to obligate us to maintain and
         support the Site or to supply any corrections, updates, or releases in
         connection therewith.
        </p>
       </div>
      </section>

      {/* GOVERNING LAW */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">16</span>
        GOVERNING LAW
       </h2>
       <div className="section-content">
        <p>
         These Terms shall be governed by and defined following the laws of
         Bangladesh. Tizaraa LIMITED and you irrevocably consent that the courts
         of Bangladesh shall have exclusive jurisdiction to resolve any dispute
         which may arise in connection with these terms.
        </p>
       </div>
      </section>

      {/* CORRECTIONS */}
      <section className="section">
       <h2 className="section-title">
        <span className="section-number">17</span>
        CORRECTIONS
       </h2>
       <div className="section-content">
        <p>
         There may be information on the Site that contains typographical
         errors, inaccuracies, or omissions, including descriptions, pricing,
         availability, and various other information. We reserve the right to
         correct any errors, inaccuracies, or omissions and to change or update
         the information on the Site at any time, without prior notice.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">18</span>
        LIMITATIONS OF LIABILITY
       </h2>
       <div className="section-content">
        <p>
         In no event will we or our directors, employees, or agents be liable to
         you or any third party for any direct, indirect, consequential,
         exemplary, incidental, special, or punitive damages, including lost
         profit, lost revenue, loss of data, or other damages arising from your
         use of the site, even if we have been advised of the possibility of
         such damages.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">19</span>
        INDEMNIFICATION
       </h2>
       <div className="section-content">
        <p>
         You agree to defend, indemnify, and hold us harmless, including our
         subsidiaries, affiliates, and all of our respective officers, agents,
         partners, and employees, from and against any loss, damage, liability,
         claim, or demand, including reasonable attorneys' fees and expenses,
         made by any third party due to or arising out of:
        </p>
        <ol>
         <li>Your Contributions</li>
         <li>Use of the Site</li>
         <li>Breach of these Terms of Use</li>
         <li>
          Any breach of your representations and warranties set forth in these
          Terms of Use
         </li>
         <li>
          Your violation of the rights of a third party, including but not
          limited to intellectual property rights;
         </li>
         <li>
          Any overt harmful act toward any other user of the Site with whom you
          connected via the Site.
         </li>
        </ol>
        <p>
         Notwithstanding the foregoing, we reserve the right, at your expense,
         to assume the exclusive defense and control of any matter for which you
         are required to indemnify us, and you agree to cooperate, at your
         expense, with our defense of such claims. We will use reasonable
         efforts to notify you of any such claim, action, or proceeding which is
         subject to this indemnification upon becoming aware of it.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">20</span>
        USER DATA
       </h2>
       <div className="section-content">
        <p>
         We will maintain certain data that you transmit to the Site for the
         purpose of managing the performance of the Site, as well as data
         relating to your use of the Site. Although we perform regular routine
         backups of data, you are solely responsible for all data that you
         transmit or that relates to any activity you have undertaken using the
         Site. You agree that we shall have no liability to you for any loss or
         corruption of any such data, and you hereby waive any right of action
         against us arising from any such loss or corruption of such data.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">21</span>
        ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
       </h2>
       <div className="section-content">
        <p>
         Visiting the site, sending us emails, and completing online forms
         constitute electronic communications. You consent to receive electronic
         communications and you agree that all agreements, notices, disclosures,
         and other communications we provide to you electronically, via email
         and on the site, satisfy any legal requirement that such communication
         is in writing. You hereby agree to the use of electronic signatures,
         contracts, orders, and other records, and to electronic delivery of
         notices, policies, and records of transactions initiated or completed
         by us or via the site. You hereby waive any rights or requirements
         under any statutes, regulations, rules, ordinances, or other laws in
         any jurisdiction which require an original signature or delivery or
         retention of non-electronic records, or to payments or the granting of
         credits by any means other than electronic means.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">22</span>
        MULTIVENDOR WEBSITE
       </h2>
       <div className="section-content">
        <p>
         You understand that products of a particular style may be sold on the
         Platform by multiple sellers and the product price on the listing page
         of the Platform, may not always reflect the lowest price for that
         particular style. This is because the seller whose price is displayed
         on the list page is selected based on the application of a number of
         parameters and price is only one such parameter.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">23</span>
        EVENTS BEYOND OUR CONTROL
       </h2>
       <div className="section-content">
        <p>
         We will not be held responsible for any delay or failure to comply with
         our obligations under these conditions if the delay or failure arises
         from any cause which is beyond our reasonable control. This condition
         does not affect your statutory rights.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">24</span>
        TAXES
       </h2>
       <div className="section-content">
        <p>
         You shall be responsible for payment of all fees/costs/charges
         associated with the purchase of products from the Site and you agree to
         bear any and all applicable taxes as per prevailing law.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">25</span>
        ORDERING PROCESS, PRICING AND PRODUCT AVAILABILITY
       </h2>
       <div className="section-content">
        <p>
         Be informed that there might be cases when an order might not be
         processed for various reasons. Tizaraa reserves the right to refuse or
         cancel any order for any reason at any given time. We may ask you to
         provide additional information or details for verification, including
         but not limited to phone number and address before we process the
         order.
        </p>
        <p>
         In order to avoid any fraudulent activity with credit or debit cards,
         we reserve the right to obtain validation of your payment details
         before providing you with the product and to verify the personal
         information you shared with us. This verification might be in the shape
         of an identity, place of residence, or banking information check.
         Failing to provide an answer to such an inquiry will automatically
         cause the cancellation of the order within a given timeline. We reserve
         the right to proceed to direct cancellation of an order for which we
         suspect any fraudulent activity of card or bank or other reasons
         without prior notice or any subsequent legal liability.
        </p>
        <p>
         All the prices are listed in Bangladeshi Taka (BDT) and are inclusive
         of VAT and are listed on the Site by the merchant that is selling the
         product or service. Items in your Shopping Cart will always show the
         most recent price which is provided on the item's detail page. Please
         note that the price may differ from the price shown of the item when
         you first added it to your cart. Keeping an item in your cart does not
         reserve the price shown at that time. It is possible that an item's
         price may decrease/increase between the time you add it to your cart
         and the time you purchase it.
        </p>
        <p>
         We do not offer price matching for any items sold by any merchant on
         our platform or other websites.
        </p>
        <p>
         We constantly work to provide the most accurate pricing information on
         our platform to our users for the best experience; however, errors may
         still occur, such as cases that the price of an item may not be
         displayed correctly on the platform. In such cases, we reserve the
         right to refuse or cancel the order. Furthermore, if such cases occur
         that is an item is wrongly priced, we may, at our own discretion,
         either contact you for discussion or cancel your order and notify you
         of such cancellation. We shall have the right to refuse or cancel any
         such orders whether or not the order has been confirmed and your
         prepayment processed. If such a cancellation case occurs on your
         prepaid order, our policies for refund will apply. Please note that
         Tizaraa reserves 100% right on the refund amount. Usually, the refund
         amount is calculated based on the customer's paid price after deducting
         any sort of discount and shipping fee. Please visit the{" "}
         <a
          href="https://tizaraa.com/return-and-refund-policy"
          className="text-link"
         >
          return and refund policy
         </a>{" "}
         to better understand our policy.
        </p>
        <p>
         We list the stock availability of products listed on the platform,
         including on each item page. Beyond what we say on the item page or
         otherwise on the platform, cannot be more specific about stock
         availability. We don't have any guaranteed processing time and moreover
         if there is any stock issue while processing your order, Tizaraa
         reserves the right to cancel any order without having any subsequent
         legal liability. In such cases we will notify you via email/SMS or call
         and if prepaid order we will process the refund according to our refund
         policy.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">26</span>
        OFFERS & CAMPAIGN
       </h2>
       <div className="section-content">
        <p>
         Tizaraa provides offers and campaigns from time to time to provide
         customers with an exciting and better shopping experience. Tizaraa
         reserves the right to cancel or change any offer or campaign at any
         given time without providing any prior reason to the customer. By
         participating in any offer or campaign, all eligible customers agree
         with these 'Terms and Conditions', 'Privacy Policy' and other relevant
         documentation that are available on Tizaraa platform including any
         modifications, alterations or updates that may be made either by
         Tizaraa or the participating merchant/s. Tizaraa shall not be liable or
         responsible to the customer for any indirect or consequential loss or
         damage.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">27</span>
        REGISTRATION CAMPAIGN
       </h2>
       <div className="section-content">
        <p>
         Upon registration, the customer will get 500tk coupon. To use the
         coupon customer will need to have a minimum of 2000tk product in the
         cart. Tizaraa reserves the right to change or cancel any coupon or the
         whole campaign without prior notice. Campaign time varies with time.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">28</span>
        MISCELLANEOUS
       </h2>
       <div className="section-content">
        <p>
         These terms of use and any policies or operating rules posted by us on
         the site or in respect to the site constitute the entire agreement and
         understanding between you and us. Our failure to exercise or enforce
         any right or provision of these terms of use shall not operate as a
         waiver of such right or provision. These terms of use operate to the
         fullest extent permissible by law. We may assign any or all of our
         rights and obligations to others at any time. We shall not be
         responsible or liable for any loss, damage, delay, or failure to act
         caused by any cause beyond our reasonable control.
        </p>
        <p>
         If any provision or part of a provision of these terms of use is
         determined to be unlawful, void, or unenforceable, that provision or
         part of the provision is deemed severable from these terms of use and
         does not affect the validity and enforceability of any remaining
         provisions. There is no joint venture, partnership, employment or
         agency relationship created between you and us as a result of these
         terms of use or use of the site. You agree that these terms of use will
         not be construed against us by virtue of having drafted them. You
         hereby waive any and all defenses you may have based on the electronic
         form of these terms of use and the lack of signing by the parties
         hereto to execute these terms of use.
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">29</span>
        OTHERS
       </h2>
       <div className="section-content">
        <div className="info-item">
         <strong>Stock availability:</strong> The orders are subject to the
         availability of stock.
        </div>
        <div className="info-item">
         <strong>Delivery Timeline:</strong> The delivery might take longer than
         the usual timeframe/line to be followed by Tizaraa. Delivery might be
         delayed due to unavoidable situations which include, but are not
         limited to, political unrest, political event, national/public
         holidays, etc.
        </div>
        <div className="info-item">
         <strong>Cancellation:</strong> Tizaraa retains the right to cancel any
         order at its sole discretion prior to dispatch and for any reason which
         may include, but not limited to, the product being mispriced, out of
         stock, expired, defective, malfunctioned, and containing incorrect
         information or description arising out of technical or typographical
         error or for any other reason.
        </div>
        <div className="info-item">
         <strong>Refund Timeline:</strong> If an order is canceled, the payment
         against such order shall be refunded within 10 (ten) working days, but
         it may take a longer time in exceptional cases. Provided that the
         received cashback amount, if any, will be adjusted with the refund
         amount.
        </div>
        <div className="info-item">
         <strong>Dispute:</strong> Tizaraa decision will be the final decision
         in any dispute claim regarding any orders.
        </div>
       </div>
      </section>

      {/* Disclaimer Section */}
      <section id="disclaimer" className="section">
       <div className="disclaimer-box">
        <h2 className="section-title">DISCLAIMER</h2>
        <div className="section-content">
         <p>
          The site is provided on an as-is and as-available basis. You agree
          that your use of the site and our services will be at your sole risk.
          To the fullest extent permitted by law, we disclaim all warranties,
          express or implied, in connection with the site and your use thereof,
          including, without limitation, the implied warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement. We make no warranties or representations about the
          accuracy or completeness of the site's content or the content of any
          websites linked to the site and we will assume no liability or
          responsibility for any
         </p>
         <ol>
          <li>Errors, mistakes, or inaccuracies of content and materials</li>
          <li>
           Personal injury or property damage, of any nature whatsoever,
           resulting from your access to and use of the site
          </li>
          <li>
           Any unauthorized access to or use of our secure servers and/or any
           and all personal information and/or financial information stored
           therein
          </li>
          <li>
           Any interruption or cessation of transmission to or from the site
          </li>
          <li>
           Any bugs, viruses, Trojan horses, or the like which may be
           transmitted to or through the site by any third party, and/or
          </li>
          <li>
           Any errors or omissions in any content and materials or for any loss
           or damage of any kind incurred as a result of the use of any content
           posted, transmitted, or otherwise made available via the site. We do
           not warrant, endorse, guarantee, or assume responsibility for any
           product or service advertised or offered by a third party through the
           site, any hyperlinked website, or any website or mobile application
           featured in any banner or other advertising, and we will not be a
           party to or in any way be responsible for monitoring any transaction
           between you and any third-party providers of products or services. As
           with the purchase of a product or service through any medium or in
           any environment, you should use your best judgment and exercise
           caution where appropriate.
          </li>
         </ol>
        </div>
       </div>
      </section>

      {/* Contact Section */}
      <section className="contact-box">
       <h2 className="section-title">CONTACT US</h2>
       <div className="section-content">
        <p>
         In order to resolve a complaint regarding the Site or to receive
         further information regarding the use of the Site, please contact us.
         To contact us, visit the following link:{" "}
         <a href="https://tizaraa.com/contact">https://tizaraa.com/contact</a>
        </p>
        <a href="https://tizaraa.com/contact" className="contact-button">
         Contact Now
        </a>
       </div>
      </section>
     </div>
    )}

    {/* Content Bangla */}
    {language === "bangla" && (
     <div className="terms-body-bangla">
      {/* Introduction */}
      <section id="introduction" className="section">
       <div className="section-content">
        <p>
         টিজারা একটি ই-কমার্স মার্কেটপ্লেস যার লক্ষ্য গ্রাহকদের প্রিমিয়াম
         অনলাইন শপিংয়ের অভিজ্ঞতা প্রদান করা।
        </p>
        <p>
         ব্যবহারের এই শর্তাবলী আপনার এবং টিজারার মধ্যে একটি আইনত বাধ্যতামূলক
         চুক্তি গঠন করে, আপনি ব্যক্তিগতভাবে বা কোনও সত্তার পক্ষে ("আপনি") এবং
         টিজারা, টিজারা ("টিজারা", "আমরা", "আমাদের") নামে ব্যবসা করছেন, আপনার
         অ্যাক্সেস এবং http://tizaraa.com ওয়েবসাইট ব্যবহারের সাথে সম্পর্কিত,
         সেইসাথে অন্য কোনও মিডিয়া ফর্ম, মিডিয়া চ্যানেল, মোবাইল ওয়েবসাইট বা
         মোবাইল অ্যাপ্লিকেশন যা এর সাথে সম্পর্কিত, সংযুক্ত বা অন্যথায় সংযুক্ত
         (সম্মিলিতভাবে, "সাইট")। আপনি সম্মত হন যে সাইটটি অ্যাক্সেস করার মাধ্যমে,
         আপনি ব্যবহারের এই সমস্ত শর্তাবলী পড়েছেন, বুঝেছেন এবং মেনে চলতে সম্মত
         হয়েছেন। আপনি যদি ব্যবহারের এই সমস্ত শর্তাবলীর সাথে একমত না হন, তবে
         আপনাকে স্পষ্টভাবে সাইটটি ব্যবহার করতে নিষেধ করা হয়েছে এবং আপনাকে
         অবিলম্বে ব্যবহার বন্ধ করতে হবে।
        </p>
        <p>
         সময় সময় সাইটে পোস্ট করা হতে পারে এমন অতিরিক্ত শর্তাবলী বা নথিগুলি
         এখানে স্পষ্টভাবে অন্তর্ভুক্ত করা হয়েছে। আমরা যে কোনও সময় এবং যে কোনও
         কারণে ব্যবহারের এই শর্তাবলীতে পরিবর্তন বা পরিমার্জন করার অধিকার সংরক্ষণ
         করি। আমরা ব্যবহারের এই শর্তাবলীর "সর্বশেষ আপডেট" তারিখ আপডেট করার
         মাধ্যমে আপনাকে কোনও পরিবর্তন সম্পর্কে সতর্ক করব এবং আপনি এই জাতীয়
         প্রতিটি পরিবর্তনের নির্দিষ্ট বিজ্ঞপ্তি পাওয়ার অধিকার ত্যাগ করবেন।
         আপডেটের বিষয়ে অবগত থাকার জন্য পর্যায়ক্রমে ব্যবহারের এই শর্তাবলী
         পর্যালোচনা করা আপনার দায়িত্ব। সংশোধিত ব্যবহারের শর্তাবলী পোস্ট করার
         তারিখের পরে সাইটের আপনার অব্যাহত ব্যবহারের মাধ্যমে আপনি কোনও সংশোধিত
         ব্যবহারের শর্তাবলীতে পরিবর্তনগুলি সম্পর্কে অবগত এবং সম্মত বলে বিবেচিত
         হবেন।
        </p>
        <p>
         সাইটে প্রদত্ত তথ্য কোনও এখতিয়ার বা দেশের কোনও ব্যক্তি বা সত্তা দ্বারা
         বিতরণ বা ব্যবহারের উদ্দেশ্যে নয় যেখানে এই জাতীয় বিতরণ বা ব্যবহার আইন
         বা নিয়ন্ত্রণের পরিপন্থী হবে বা যা আমাদের এই জাতীয় এখতিয়ার বা দেশের
         মধ্যে কোনও নিবন্ধকরণ প্রয়োজনীয়তার সাপেক্ষে করবে। তদনুসারে, যারা
         অন্যান্য স্থান থেকে সাইটটি অ্যাক্সেস করতে চান তারা তাদের নিজস্ব উদ্যোগে
         তা করেন এবং স্থানীয় আইন প্রযোজ্য হলে এবং সেই পরিমাণে স্থানীয় আইন মেনে
         চলার জন্য সম্পূর্ণরূপে দায়বদ্ধ।
        </p>
        <p>
         যে সকল ব্যবহারকারী তাদের বসবাসের এখতিয়ারে অপ্রাপ্তবয়স্ক (সাধারণত ১৮
         বছরের কম বয়সী) তাদের সাইটটি ব্যবহার করার জন্য তাদের পিতামাতা বা
         অভিভাবকের অনুমতি থাকতে হবে এবং সরাসরি তত্ত্বাবধানে থাকতে হবে। আপনি যদি
         অপ্রাপ্তবয়স্ক হন তবে সাইটটি ব্যবহার করার আগে আপনার পিতামাতা বা
         অভিভাবককে ব্যবহারের এই শর্তাবলী পড়তে এবং সম্মত হতে হবে।
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">১</span>
        মেধাস্বত্ব অধিকার
       </h2>
       <div className="section-content">
        <p>
         অন্যথায় নির্দেশিত না হলে, সাইটটি আমাদের মালিকানাধীন সম্পত্তি এবং
         সাইটের সমস্ত সোর্স কোড, ডেটাবেস, কার্যকারিতা, সফ্টওয়্যার, ওয়েবসাইট
         ডিজাইন, অডিও, ভিডিও, টেক্সট, ফটোগ্রাফ এবং গ্রাফিক্স (সম্মিলিতভাবে,
         "বিষয়বস্তু") এবং এতে থাকা ট্রেডমার্ক, পরিষেবা চিহ্ন এবং লোগো ("চিহ্ন")
         আমাদের মালিকানাধীন বা নিয়ন্ত্রিত বা আমাদের লাইসেন্সপ্রাপ্ত। বিষয়বস্তু
         এবং চিহ্নগুলি শুধুমাত্র আপনার তথ্য এবং ব্যক্তিগত ব্যবহারের জন্য "যেমন
         আছে" ভিত্তিতে সাইটে সরবরাহ করা হয়েছে।
        </p>
        <p>
         ব্যবহারের এই শর্তাবলীতে স্পষ্টভাবে বিধান করা ব্যতীত, সাইটের কোনও অংশ
         এবং কোনও বিষয়বস্তু বা চিহ্ন অনুলিপি, পুনরুৎপাদন, একত্রিত, পুনঃপ্রকাশ,
         আপলোড, পোস্ট, সর্বজনীনভাবে প্রদর্শিত, এনকোড, অনুবাদ, প্রেরণ, বিতরণ,
         বিক্রি, লাইসেন্স বা অন্যথায় কোনও বাণিজ্যিক উদ্দেশ্যে ব্যবহার করা যাবে
         না, আমাদের স্পষ্ট পূর্ব লিখিত অনুমতি ব্যতীত।
        </p>
        <p>
         যতক্ষণ আপনি সাইটটি ব্যবহার করার যোগ্য, ততক্ষণ আপনাকে সাইটটি অ্যাক্সেস
         এবং ব্যবহার করার এবং বিষয়বস্তুর যে কোনও অংশের একটি অনুলিপি ডাউনলোড বা
         মুদ্রণ করার জন্য একটি সীমিত লাইসেন্স মঞ্জুর করা হয়েছে যা আপনি
         কেবলমাত্র আপনার ব্যক্তিগত, অ-বাণিজ্যিক ব্যবহারের জন্য সঠিকভাবে
         অ্যাক্সেস করেছেন। সাইট, বিষয়বস্তু এবং চিহ্নগুলিতে আপনাকে স্পষ্টভাবে
         মঞ্জুর করা হয়নি এমন সমস্ত অধিকার আমরা সংরক্ষণ করি।
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">২</span>
        ব্যবহারকারীর উপস্থাপনা
       </h2>
       <div className="section-content">
        <p>সাইটটি ব্যবহার করে, আপনি প্রতিনিধিত্ব করেন এবং ওয়ারেন্টি দেন যে:</p>

        <ol>
         <li>
          আপনার জমা দেওয়া সমস্ত নিবন্ধকরণ তথ্য সত্য, নির্ভুল, বর্তমান এবং
          সম্পূর্ণ হবে।
         </li>
         <li>
          আপনি এই জাতীয় তথ্যের নির্ভুলতা বজায় রাখবেন এবং প্রয়োজনে এই জাতীয়
          নিবন্ধকরণ তথ্য অবিলম্বে আপডেট করবেন।
         </li>
         <li>
          আপনার আইনি সক্ষমতা রয়েছে এবং আপনি ব্যবহারের এই শর্তাবলী মেনে চলতে
          সম্মত হন।
         </li>
         <li>
          আপনি যে এখতিয়ারে বাস করেন সেখানে আপনি অপ্রাপ্তবয়স্ক নন, অথবা যদি
          অপ্রাপ্তবয়স্ক হন তবে সাইটটি ব্যবহার করার জন্য আপনি পিতামাতার অনুমতি
          পেয়েছেন।
         </li>
         <li>
          আপনি স্বয়ংক্রিয় বা অ-মানবিক উপায়ে, কোনও বট, স্ক্রিপ্ট বা অন্য কোনও
          উপায়ে সাইটটি অ্যাক্সেস করবেন না।
         </li>
         <li>আপনি কোনও অবৈধ বা অননুমোদিত উদ্দেশ্যে সাইটটি ব্যবহার করবেন না।</li>
         <li>
          সাইটের আপনার ব্যবহার কোনও প্রযোজ্য আইন বা নিয়ন্ত্রণ লঙ্ঘন করবে না।
         </li>
        </ol>

        <p>
         যদি আপনি কোনও তথ্য প্রদান করেন যা মিথ্যা, ভুল, বর্তমান নয় বা
         অসম্পূর্ণ, তবে আপনার অ্যাকাউন্ট স্থগিত বা বন্ধ করার এবং সাইটের (বা এর
         কোনও অংশের) যে কোনও এবং ভবিষ্যতের ব্যবহার প্রত্যাখ্যান করার অধিকার
         আমাদের রয়েছে।
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">৩</span>
        ব্যবহারকারীর নিবন্ধন
       </h2>
       <div className="section-content">
        <p>
         আপনাকে সাইটের সাথে নিবন্ধন করতে হতে পারে। আপনি আপনার পাসওয়ার্ড গোপন
         রাখতে সম্মত হন এবং আপনার অ্যাকাউন্ট এবং পাসওয়ার্ডের সমস্ত ব্যবহারের
         জন্য আপনি দায়বদ্ধ থাকবেন। আমরা আপনার নির্বাচিত ব্যবহারকারীর নাম
         অপসারণ, পুনরুদ্ধার বা পরিবর্তন করার অধিকার সংরক্ষণ করি যদি আমরা, আমাদের
         নিজস্ব বিবেচনার ভিত্তিতে, নির্ধারণ করি যে এই জাতীয় ব্যবহারকারীর নাম
         অনুপযুক্ত, অশ্লীল বা অন্যথায় আপত্তিকর।
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">৪</span>
        নিষিদ্ধ কার্যকলাপ
       </h2>
       <div className="section-content">
        <p>
         সাইটটি আমরা যে উদ্দেশ্যে উপলব্ধ করি তা ব্যতীত অন্য কোনও উদ্দেশ্যে আপনি
         অ্যাক্সেস বা ব্যবহার করতে পারবেন না। আমাদের দ্বারা বিশেষভাবে অনুমোদিত
         বা অনুমোদিত ব্যতীত কোনও বাণিজ্যিক প্রচেষ্টার সাথে সাইটটি ব্যবহার করা
         যাবে না।
        </p>
        <p>সাইটের ব্যবহারকারী হিসাবে, আপনি নিম্নলিখিত কাজ না করতে সম্মত হন:</p>

        <ol>
         <li>
          আমাদের কাছ থেকে লিখিত অনুমতি ব্যতীত সরাসরি বা পরোক্ষভাবে একটি সংগ্রহ,
          সংকলন, ডেটাবেস বা ডিরেক্টরি তৈরি বা সংকলন করার জন্য সাইট থেকে
          পদ্ধতিগতভাবে ডেটা বা অন্যান্য বিষয়বস্তু পুনরুদ্ধার করা।
         </li>
        </ol>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">৫</span>
        অবদান লাইসেন্স
       </h2>
       <div className="section-content">
        <p>
         সাইটের কোনও অংশে আপনার অবদান পোস্ট করে বা সাইট থেকে আপনার কোনও সামাজিক
         নেটওয়ার্কিং অ্যাকাউন্টে আপনার অ্যাকাউন্ট লিঙ্ক করে সাইটে অবদান
         অ্যাক্সেসযোগ্য করে, আপনি স্বয়ংক্রিয়ভাবে আমাদের একটি অনিয়ন্ত্রিত,
         সীমাহীন, অপরিবর্তনীয়, চিরস্থায়ী, অ-এক্সক্লুসিভ, হস্তান্তরযোগ্য,
         রয়্যালটি-মুক্ত, সম্পূর্ণ-পরিশোধিত, বিশ্বব্যাপী অধিকার এবং লাইসেন্স
         মঞ্জুর করেন এবং আপনি প্রতিনিধিত্ব করেন এবং ওয়ারেন্টি দেন যে আপনার কাছে
         এই অধিকার মঞ্জুর করার অধিকার রয়েছে।
        </p>

        <p>
         এই লাইসেন্সের অধীনে আমরা আপনার অবদান (আপনার ছবি এবং ভয়েস সহ, তবে
         সীমাবদ্ধ নয়) হোস্ট, ব্যবহার, অনুলিপি, পুনরুৎপাদন, প্রকাশ, বিক্রি,
         পুনরায় বিক্রি, প্রকাশ, সম্প্রচার, পুনঃনামকরণ, সংরক্ষণ, ক্যাশে,
         সর্বজনীনভাবে সম্পাদন, সর্বজনীনভাবে প্রদর্শন, পুনরায় বিন্যাস, অনুবাদ,
         প্রেরণ, উদ্ধৃত (সম্পূর্ণ বা আংশিকভাবে) এবং বিতরণ করার অধিকার রাখি,
         বাণিজ্যিক, বিজ্ঞাপন বা অন্য কোনও উদ্দেশ্যে, এবং এই জাতীয় অবদানগুলির
         ডেরিভেটিভ কাজ তৈরি করতে বা অন্যান্য কাজের সাথে অন্তর্ভুক্ত করতে এবং
         পূর্বোক্তের সাবলাইসেন্স মঞ্জুর এবং অনুমোদন করার অধিকার রাখি। ব্যবহার
         এবং বিতরণ যে কোনও মিডিয়া ফর্ম্যাটে এবং যে কোনও মিডিয়া চ্যানেলের
         মাধ্যমে ঘটতে পারে।
        </p>

        <p>
         এই লাইসেন্সটি এখন পরিচিত বা ভবিষ্যতে তৈরি হওয়া যে কোনও ফর্ম, মিডিয়া
         বা প্রযুক্তির ক্ষেত্রে প্রযোজ্য হবে এবং এতে আপনার নাম, কোম্পানির নাম
         এবং ফ্র্যাঞ্চাইজির নাম, প্রযোজ্য ক্ষেত্রে এবং আপনার সরবরাহ করা কোনও
         ট্রেডমার্ক, পরিষেবা চিহ্ন, ট্রেড নাম, লোগো এবং ব্যক্তিগত ও বাণিজ্যিক
         চিত্রগুলির আমাদের ব্যবহার অন্তর্ভুক্ত রয়েছে। আপনি আপনার অবদানগুলিতে
         সমস্ত নৈতিক অধিকার ত্যাগ করেন এবং আপনি ওয়ারেন্টি দেন যে আপনার
         অবদানগুলিতে অন্যথায় নৈতিক অধিকার দাবি করা হয়নি।
        </p>

        <p>
         আমরা আপনার অবদানগুলির উপর কোনও মালিকানা দাবি করি না। আপনি আপনার সমস্ত
         অবদান এবং আপনার অবদানগুলির সাথে যুক্ত কোনও মেধা সম্পত্তি অধিকার বা
         অন্যান্য মালিকানা অধিকারের সম্পূর্ণ মালিকানা বজায় রাখেন। সাইটের কোনও
         অংশে আপনার সরবরাহ করা আপনার অবদানগুলিতে কোনও বিবৃতি বা উপস্থাপনার জন্য
         আমরা দায়বদ্ধ নই। সাইটে আপনার অবদানগুলির জন্য আপনি সম্পূর্ণরূপে
         দায়বদ্ধ এবং আপনি স্পষ্টভাবে আপনার অবদান সম্পর্কিত আমাদের বিরুদ্ধে কোনও
         এবং সমস্ত দায়বদ্ধতা থেকে আমাদের খালাস দিতে এবং কোনও আইনি পদক্ষেপ
         নেওয়া থেকে বিরত থাকতে সম্মত হন।
        </p>

        <p>আমাদের নিজস্ব এবং পরম বিবেচনার ভিত্তিতে নিম্নলিখিত অধিকার রয়েছে:</p>

        <ol>
         <li>কোনও অবদান সম্পাদনা, সংশোধন বা অন্যথায় পরিবর্তন করা।</li>
         <li>
          সাইটে আরও উপযুক্ত স্থানে রাখার জন্য কোনও অবদানকে পুনরায় শ্রেণীবদ্ধ
          করা।
         </li>
         <li>
          কোনও বিজ্ঞপ্তি ছাড়াই যে কোনও সময় এবং যে কোনও কারণে কোনও অবদান
          পূর্ব-স্ক্রীন বা মুছে ফেলা। আপনার অবদানগুলি নিরীক্ষণ করার কোনও
          বাধ্যবাধকতা আমাদের নেই।
         </li>
        </ol>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">৬</span>
        পর্যালোচনাগুলির জন্য নির্দেশিকা
       </h2>
       <div className="section-content">
        <p>
         আমরা আপনাকে সাইটে পর্যালোচনা বা রেটিং দেওয়ার জন্য ক্ষেত্র সরবরাহ করতে
         পারি। পর্যালোচনা পোস্ট করার সময়, আপনাকে নিম্নলিখিত মানদণ্ড মেনে চলতে
         হবে:
        </p>

        <ol>
         <li>
          পর্যালোচনা করা ব্যক্তি/সত্তা সম্পর্কে আপনার প্রথম হাতের অভিজ্ঞতা থাকতে
          হবে।
         </li>
         <li>
          আপনার পর্যালোচনাগুলিতে আপত্তিকর অশ্লীলতা, বা অপমানজনক, বর্ণবাদী,
          আপত্তিকর বা বিদ্বেষপূর্ণ ভাষা থাকা উচিত নয়।
         </li>
         <li>
          আপনার পর্যালোচনাগুলিতে ধর্ম, জাতি, লিঙ্গ, জাতীয় উত্স, বয়স, বৈবাহিক
          অবস্থা, যৌন প্রবণতা বা অক্ষমতার ভিত্তিতে বৈষম্যমূলক উল্লেখ থাকা উচিত
          নয়।
         </li>
         <li>আপনার পর্যালোচনাগুলিতে অবৈধ কার্যকলাপের উল্লেখ থাকা উচিত নয়।</li>
         <li>
          নেতিবাচক পর্যালোচনা পোস্ট করার সময় আপনার প্রতিযোগীদের সাথে কোনও
          সম্পর্ক থাকা উচিত নয়।
         </li>
         <li>আপনার আচরণের বৈধতা সম্পর্কে কোনও সিদ্ধান্তে আসা উচিত নয়।</li>
         <li>আপনি কোনও মিথ্যা বা বিভ্রান্তিকর বিবৃতি পোস্ট করতে পারবেন না।</li>
         <li>
          আপনি ইতিবাচক বা নেতিবাচক যাই হোক না কেন, অন্যদের পর্যালোচনা পোস্ট করতে
          উৎসাহিত করে এমন কোনও প্রচারণা সংগঠিত করতে পারবেন না।
         </li>
        </ol>

        <p>
         আমরা আমাদের নিজস্ব বিবেচনার ভিত্তিতে পর্যালোচনা গ্রহণ, প্রত্যাখ্যান বা
         অপসারণ করতে পারি। পর্যালোচনা স্ক্রীন করার বা পর্যালোচনা মুছে ফেলার কোনও
         বাধ্যবাধকতা আমাদের নেই, এমনকি যদি কেউ পর্যালোচনাগুলিকে আপত্তিকর বা ভুল
         বলে মনে করে। পর্যালোচনাগুলি আমাদের দ্বারা অনুমোদিত নয় এবং আমাদের বা
         আমাদের কোনও সহযোগী বা অংশীদারের মতামতকে অপরিহার্যভাবে উপস্থাপন করে না।
         কোনও পর্যালোচনা বা কোনও পর্যালোচনার ফলে উদ্ভূত কোনও দাবি, দায়বদ্ধতা বা
         ক্ষতির জন্য আমরা কোনও দায়বদ্ধতা গ্রহণ করি না।
        </p>

        <p>
         পর্যালোচনা পোস্ট করার মাধ্যমে, আপনি এতদ্বারা আমাদের একটি চিরস্থায়ী,
         অ-এক্সক্লুসিভ, বিশ্বব্যাপী, রয়্যালটি-মুক্ত, সম্পূর্ণরূপে পরিশোধিত,
         হস্তান্তরযোগ্য এবং সাবলাইসেন্সযোগ্য অধিকার এবং লাইসেন্স প্রদান করেন
         পর্যালোচনা সম্পর্কিত সমস্ত বিষয়বস্তু পুনরুৎপাদন, সংশোধন, অনুবাদ, যে
         কোনও উপায়ে প্রেরণ, প্রদর্শন, সম্পাদন এবং/অথবা বিতরণ করার জন্য।
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">৭</span>
        মোবাইল অ্যাপ্লিকেশন লাইসেন্স
       </h2>
       <div className="section-content">
        <h3 className="subsection-title">ব্যবহারের লাইসেন্স</h3>
        <p>
         আপনি যদি কোনও মোবাইল অ্যাপ্লিকেশনের মাধ্যমে সাইটটি অ্যাক্সেস করেন, তবে
         আমরা আপনাকে আপনার মালিকানাধীন বা নিয়ন্ত্রিত ওয়্যারলেস ইলেকট্রনিক
         ডিভাইসগুলিতে মোবাইল অ্যাপ্লিকেশনটি ইনস্টল এবং ব্যবহার করার এবং
         ব্যবহারের এই শর্তাবলীতে থাকা এই মোবাইল অ্যাপ্লিকেশন লাইসেন্সের শর্তাবলী
         অনুসারে এই ডিভাইসগুলিতে কঠোরভাবে মোবাইল অ্যাপ্লিকেশনটি অ্যাক্সেস এবং
         ব্যবহার করার জন্য একটি প্রত্যাহারযোগ্য, অ-এক্সক্লুসিভ,
         অ-হস্তান্তরযোগ্য, সীমিত অধিকার মঞ্জুর করি। আপনি নিম্নলিখিত কাজ করবেন
         না:
        </p>

        <ol>
         <li>
          অ্যাপ্লিকেশনটির সোর্স কোড ডিকম্পাইল, রিভার্স ইঞ্জিনিয়ার,
          ডিসঅ্যাসেম্বল এবং প্রাপ্ত করার চেষ্টা করা বা অ্যাপ্লিকেশনটি ডিক্রিপ্ট
          করা।
         </li>
         <li>
          অ্যাপ্লিকেশন থেকে কোনও পরিবর্তন, অভিযোজন, উন্নতি, বর্ধিতকরণ, অনুবাদ বা
          ডেরিভেটিভ কাজ তৈরি করা।
         </li>
         <li>
          অ্যাপ্লিকেশনটির আপনার অ্যাক্সেস বা ব্যবহারের সাথে সম্পর্কিত কোনও
          প্রযোজ্য আইন, নিয়ম বা বিধি লঙ্ঘন করা।
         </li>
         <li>
          আমাদের বা অ্যাপ্লিকেশনটির লাইসেন্সদাতাদের দ্বারা পোস্ট করা কোনও
          মালিকানাধীন বিজ্ঞপ্তি (কপিরাইট বা ট্রেডমার্কের কোনও বিজ্ঞপ্তি সহ)
          সরানো, পরিবর্তন করা বা অস্পষ্ট করা।
         </li>
         <li>
          কোনও রাজস্ব-উত্পাদনকারী প্রচেষ্টা, বাণিজ্যিক উদ্যোগ বা অন্য কোনও
          উদ্দেশ্যে অ্যাপ্লিকেশনটি ব্যবহার করা যার জন্য এটি ডিজাইন বা
          উদ্দেশ্যযুক্ত নয়।
         </li>
         <li>
          একই সময়ে একাধিক ডিভাইস বা ব্যবহারকারীর অ্যাক্সেস বা ব্যবহারের অনুমতি
          দেয় এমন কোনও নেটওয়ার্ক বা অন্য পরিবেশে অ্যাপ্লিকেশনটি উপলব্ধ করা।
         </li>
         <li>
          এমন কোনও পণ্য, পরিষেবা বা সফ্টওয়্যার তৈরি করতে অ্যাপ্লিকেশনটি ব্যবহার
          করা যা প্রত্যক্ষ বা পরোক্ষভাবে অ্যাপ্লিকেশনটির সাথে প্রতিযোগিতামূলক বা
          কোনও উপায়ে অ্যাপ্লিকেশনটির বিকল্প।
         </li>
         <li>
          কোনও ওয়েবসাইটে স্বয়ংক্রিয় প্রশ্ন পাঠাতে বা কোনও অযাচিত বাণিজ্যিক
          ই-মেল পাঠাতে অ্যাপ্লিকেশনটি ব্যবহার করা।
         </li>
         <li>
          অ্যাপ্লিকেশনটির সাথে ব্যবহারের জন্য কোনও অ্যাপ্লিকেশন, আনুষাঙ্গিক বা
          ডিভাইসের নকশা, বিকাশ, উত্পাদন, লাইসেন্সিং বা বিতরণে কোনও মালিকানাধীন
          তথ্য বা আমাদের কোনও ইন্টারফেস বা আমাদের অন্য কোনও মেধা সম্পত্তি
          ব্যবহার করা।
         </li>
        </ol>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">৮</span>
        সোশ্যাল মিডিয়া
       </h2>
       <div className="section-content">
        <p>
         সাইটের কার্যকারিতার অংশ হিসাবে, আপনি আপনার অ্যাকাউন্টটিকে তৃতীয় পক্ষের
         পরিষেবা সরবরাহকারীদের সাথে আপনার অনলাইন অ্যাকাউন্টগুলির সাথে লিঙ্ক করতে
         পারেন (এই জাতীয় প্রতিটি অ্যাকাউন্ট, একটি "তৃতীয় পক্ষের অ্যাকাউন্ট")
         নিম্নলিখিত উপায়ে:
        </p>

        <ol>
         <li>
          সাইটের মাধ্যমে আপনার তৃতীয় পক্ষের অ্যাকাউন্টের লগইন তথ্য সরবরাহ করা।
         </li>
         <li>
          আপনার প্রতিটি তৃতীয় পক্ষের অ্যাকাউন্ট ব্যবহারের ক্ষেত্রে প্রযোজ্য
          শর্তাবলী অনুসারে আমাদের আপনার তৃতীয় পক্ষের অ্যাকাউন্ট অ্যাক্সেস করার
          অনুমতি দেওয়া।
         </li>
        </ol>

        <p>
         আপনি প্রতিনিধিত্ব করেন এবং ওয়ারেন্টি দেন যে আপনি আপনার তৃতীয় পক্ষের
         অ্যাকাউন্টের লগইন তথ্য আমাদের কাছে প্রকাশ করার এবং/অথবা আপনার তৃতীয়
         পক্ষের অ্যাকাউন্ট অ্যাক্সেস করার অনুমতি দেওয়ার অধিকারী, আপনার প্রযোজ্য
         তৃতীয় পক্ষের অ্যাকাউন্ট ব্যবহারের ক্ষেত্রে প্রযোজ্য কোনও শর্তাবলীর
         লঙ্ঘন ছাড়াই এবং তৃতীয় পক্ষের অ্যাকাউন্ট সরবরাহকারীর দ্বারা আরোপিত
         কোনও ফি প্রদান বা কোনও ব্যবহারের সীমাবদ্ধতার সাপেক্ষে আমাদের বাধ্য না
         করে।
        </p>

        <p>
         আমাদের কোনও তৃতীয় পক্ষের অ্যাকাউন্ট অ্যাক্সেস করার অনুমতি দেওয়ার
         মাধ্যমে, আপনি বুঝতে পারেন যে:
        </p>

        <ol>
         <li>
          আমরা আপনার তৃতীয় পক্ষের অ্যাকাউন্টে ("সোশ্যাল নেটওয়ার্ক কনটেন্ট")
          সরবরাহ করা এবং সংরক্ষিত কোনও সামগ্রী অ্যাক্সেস, উপলব্ধ এবং সংরক্ষণ
          করতে পারি (প্রযোজ্য ক্ষেত্রে) যাতে এটি আপনার অ্যাকাউন্টের মাধ্যমে
          সাইটে এবং এর মাধ্যমে উপলব্ধ হয়, যার মধ্যে কোনও বন্ধু তালিকা
          সীমাবদ্ধতা ছাড়াই অন্তর্ভুক্ত।
         </li>
         <li>
          আপনি যখন তৃতীয় পক্ষের অ্যাকাউন্টের সাথে আপনার অ্যাকাউন্ট লিঙ্ক করেন
          তখন আপনাকে অবহিত করা হলে আমরা আপনার তৃতীয় পক্ষের অ্যাকাউন্ট থেকে
          অতিরিক্ত তথ্য জমা দিতে এবং গ্রহণ করতে পারি।
         </li>
        </ol>

        <p>
         আপনি যে তৃতীয় পক্ষের অ্যাকাউন্টগুলি চয়ন করেন এবং এই জাতীয় তৃতীয়
         পক্ষের অ্যাকাউন্টগুলিতে আপনার সেট করা গোপনীয়তা সেটিংসের উপর নির্ভর
         করে, আপনার তৃতীয় পক্ষের অ্যাকাউন্টগুলিতে পোস্ট করা ব্যক্তিগতভাবে
         সনাক্তযোগ্য তথ্য সাইটে আপনার অ্যাকাউন্টে এবং এর মাধ্যমে উপলব্ধ হতে
         পারে। দয়া করে মনে রাখবেন যে যদি কোনও তৃতীয় পক্ষের অ্যাকাউন্ট বা
         সংশ্লিষ্ট পরিষেবা অনুপলব্ধ হয়ে যায় বা তৃতীয় পক্ষের পরিষেবা
         সরবরাহকারী দ্বারা এই জাতীয় তৃতীয় পক্ষের অ্যাকাউন্টে আমাদের অ্যাক্সেস
         বন্ধ করে দেওয়া হয়, তবে সোশ্যাল নেটওয়ার্ক কনটেন্ট আর সাইটে এবং এর
         মাধ্যমে উপলব্ধ নাও হতে পারে।
        </p>

        <p>
         আপনার সাইটের অ্যাকাউন্টের সাথে আপনার তৃতীয় পক্ষের অ্যাকাউন্টগুলির
         সংযোগ নিষ্ক্রিয় করার ক্ষমতা আপনার থাকবে। দয়া করে মনে রাখবেন যে আপনার
         তৃতীয় পক্ষের অ্যাকাউন্টগুলির সাথে যুক্ত তৃতীয় পক্ষের পরিষেবা
         সরবরাহকারীদের সাথে আপনার সম্পর্ক কেবলমাত্র এই জাতীয় তৃতীয় পক্ষের
         পরিষেবা সরবরাহকারীদের সাথে আপনার চুক্তি(গুলি) দ্বারা নিয়ন্ত্রিত হয়।
         আমরা কোনও উদ্দেশ্যে কোনও সোশ্যাল নেটওয়ার্ক কনটেন্ট পর্যালোচনা করার
         কোনও প্রচেষ্টা করি না, যার মধ্যে নির্ভুলতা, বৈধতা বা অ-লঙ্ঘন সহ তবে
         সীমাবদ্ধ নয় এবং আমরা কোনও সোশ্যাল নেটওয়ার্ক কনটেন্টের জন্য দায়বদ্ধ
         নই।
        </p>

        <p>
         আপনি স্বীকার করেন এবং সম্মত হন যে আমরা কেবলমাত্র সেই পরিচিতিগুলি সনাক্ত
         এবং অবহিত করার উদ্দেশ্যে তৃতীয় পক্ষের অ্যাকাউন্টের সাথে যুক্ত আপনার
         ইমেল ঠিকানা বই এবং আপনার মোবাইল ডিভাইস বা ট্যাবলেট কম্পিউটারে সঞ্চিত
         আপনার পরিচিতি তালিকা অ্যাক্সেস করতে পারি যারা সাইটটি ব্যবহার করার জন্য
         নিবন্ধিত হয়েছে। নীচের যোগাযোগের তথ্য ব্যবহার করে বা আপনার অ্যাকাউন্ট
         সেটিংসের মাধ্যমে (প্রযোজ্য ক্ষেত্রে) আপনি সাইট এবং আপনার তৃতীয় পক্ষের
         অ্যাকাউন্টের মধ্যে সংযোগ নিষ্ক্রিয় করতে পারেন। আমরা আমাদের
         সার্ভারগুলিতে সঞ্চিত কোনও তথ্য মুছে ফেলার চেষ্টা করব যা এই জাতীয়
         তৃতীয় পক্ষের অ্যাকাউন্টের মাধ্যমে প্রাপ্ত হয়েছিল, আপনার অ্যাকাউন্টের
         সাথে যুক্ত ব্যবহারকারীর নাম এবং প্রোফাইল ছবি ব্যতীত।
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">৯</span>
        জমা
       </h2>
       <div className="section-content">
        <p>
         আপনি স্বীকার করেন এবং সম্মত হন যে সাইট ("জমা") সম্পর্কিত আপনার সরবরাহ
         করা কোনও প্রশ্ন, মন্তব্য, পরামর্শ, ধারণা, প্রতিক্রিয়া বা অন্য কোনও
         তথ্য অ-গোপনীয় এবং আমাদের একমাত্র সম্পত্তিতে পরিণত হবে। আমাদের সমস্ত
         মেধা সম্পত্তি অধিকার সহ একচেটিয়া অধিকার থাকবে এবং আপনাকে স্বীকৃতি বা
         ক্ষতিপূরণ ছাড়াই কোনও বৈধ উদ্দেশ্যে, বাণিজ্যিক বা অন্যথায় এই জমাগুলির
         অনিয়ন্ত্রিত ব্যবহার এবং প্রচারের অধিকারী হবে।
        </p>

        <p>
         আপনি এতদ্বারা এই জাতীয় জমাগুলির সমস্ত নৈতিক অধিকার ত্যাগ করেন এবং আপনি
         এতদ্বারা ওয়ারেন্টি দেন যে এই জাতীয় জমাগুলি আপনার মূল বা আপনার এই
         জাতীয় জমা জমা দেওয়ার অধিকার রয়েছে। আপনি সম্মত হন যে আপনার জমাগুলিতে
         কোনও মালিকানাধীন অধিকারের কোনও কথিত বা প্রকৃত লঙ্ঘন বা অপব্যবহারের জন্য
         আমাদের বিরুদ্ধে কোনও অবলম্বন থাকবে না।
        </p>
       </div>
      </section>

      <section className="section">
       <h2 className="section-title">
        <span className="section-number">১০</span>
        তৃতীয় পক্ষের ওয়েবসাইট এবং বিষয়বস্তু
       </h2>
       <div className="section-content">
        <p>
         সাইটে তৃতীয় পক্ষের ওয়েবসাইট ("তৃতীয় পক্ষের ওয়েবসাইট") এর লিঙ্ক
         থাকতে পারে (অথবা আপনাকে সাইটের মাধ্যমে পাঠানো হতে পারে) সেইসাথে তৃতীয়
         পক্ষের ("তৃতীয় পক্ষের বিষয়বস্তু") এর অন্তর্গত বা উদ্ভূত নিবন্ধ,
         ফটোগ্রাফ, পাঠ্য, গ্রাফিক্স, ছবি, ডিজাইন, সঙ্গীত, শব্দ, ভিডিও, তথ্য,
         অ্যাপ্লিকেশন, সফ্টওয়্যার এবং অন্যান্য বিষয়বস্তু বা আইটেম থাকতে পারে।
        </p>

        <p>
         এই জাতীয় তৃতীয় পক্ষের ওয়েবসাইট এবং তৃতীয় পক্ষের বিষয়বস্তু আমাদের
         দ্বারা নির্ভুলতা, উপযুক্ততা বা সম্পূর্ণতার জন্য তদন্ত, নিরীক্ষণ বা
         পরীক্ষা করা হয় না এবং সাইটের মাধ্যমে অ্যাক্সেস করা কোনও তৃতীয় পক্ষের
         ওয়েবসাইট বা সাইটে পোস্ট করা, এর মাধ্যমে উপলব্ধ বা ইনস্টল করা কোনও
         তৃতীয় পক্ষের বিষয়বস্তুর জন্য আমরা দায়বদ্ধ নই, যার মধ্যে তৃতীয়
         পক্ষের ওয়েবসাইট বা তৃতীয় পক্ষের বিষয়বস্তুর বিষয়বস্তু, নির্ভুলতা,
         আপত্তিকরতা, মতামত, নির্ভরযোগ্যতা, গোপনীয়তা অনুশীলন বা অন্যান্য নীতি
         অন্তর্ভুক্ত।
        </p>

        <p>
         কোনও তৃতীয় পক্ষের ওয়েবসাইট বা কোনও তৃতীয় পক্ষের বিষয়বস্তুর
         অন্তর্ভুক্তি, লিঙ্ক করা বা ব্যবহার বা ইনস্টল করার অনুমতি দেওয়া আমাদের
         দ্বারা এর অনুমোদন বা সমর্থন বোঝায় না। আপনি যদি সাইটটি ছেড়ে তৃতীয়
         পক্ষের ওয়েবসাইটগুলিতে অ্যাক্সেস করার বা কোনও তৃতীয় পক্ষের বিষয়বস্তু
         ব্যবহার বা ইনস্টল করার সিদ্ধান্ত নেন তবে আপনি নিজের ঝুঁকিতে তা করেন এবং
         আপনার সচেতন থাকা উচিত যে ব্যবহারের এই শর্তাবলী আর প্রযোজ্য নয়।
        </p>

        <p>
         সাইট থেকে আপনি যে কোনও ওয়েবসাইটে নেভিগেট করেন বা সাইট থেকে আপনি যে
         কোনও অ্যাপ্লিকেশন ব্যবহার বা ইনস্টল করেন তার সাথে সম্পর্কিত কোনও
         ওয়েবসাইটের প্রযোজ্য শর্তাবলী এবং নীতি, যার মধ্যে গোপনীয়তা এবং ডেটা
         সংগ্রহের অনুশীলন অন্তর্ভুক্ত রয়েছে, আপনার পর্যালোচনা করা উচিত। তৃতীয়
         পক্ষের ওয়েবসাইটগুলির মাধ্যমে আপনি যে কোনও ক্রয় করেন তা অন্যান্য
         ওয়েবসাইট এবং অন্যান্য সংস্থাগুলির মাধ্যমে হবে এবং এই জাতীয় ক্রয়ের
         সাথে সম্পর্কিত কোনও দায়বদ্ধতা আমরা গ্রহণ করি না যা সম্পূর্ণরূপে আপনার
         এবং প্রযোজ্য তৃতীয় পক্ষের মধ্যে।
        </p>

        <p>
         আপনি সম্মত হন এবং স্বীকার করেন যে আমরা তৃতীয় পক্ষের ওয়েবসাইটগুলিতে
         প্রদত্ত পণ্য বা পরিষেবাগুলির অনুমোদন করি না এবং এই জাতীয় পণ্য বা
         পরিষেবাগুলির আপনার ক্রয়ের ফলে সৃষ্ট কোনও ক্ষতির জন্য আপনি আমাদের
         ক্ষতিপূরণ দেবেন। এছাড়াও, তৃতীয় পক্ষের বিষয়বস্তু বা তৃতীয় পক্ষের
         ওয়েবসাইটগুলির সাথে কোনও যোগাযোগের সাথে সম্পর্কিত বা এর ফলে আপনার যে
         কোনও ক্ষতি বা আপনার ক্ষতিগ্রস্থ হওয়ার জন্য আপনি আমাদের ক্ষতিপূরণ
         দেবেন।
        </p>
       </div>
      </section>

      <section className="contact-box">
       <h2 className="section-title">যোগাযোগ করুন</h2>
       <div className="section-content">
        <p>
         সাইট সম্পর্কিত কোনো অভিযোগের সমাধান করতে বা সাইটের ব্যবহার সম্পর্কিত
         আরও তথ্য পেতে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। • আমাদের সাথে
         যোগাযোগ করতে, নিম্নলিখিত লিঙ্কটি দেখুন:{" "}
         <a href="https://tizaraa.com/contact">https://tizaraa.com/contact</a>
        </p>
        <a href="https://tizaraa.com/contact" className="contact-button">
         যোগাযোগ করুন
        </a>
       </div>
      </section>
     </div>
    )}
   </div>
  </div>
 );
}
