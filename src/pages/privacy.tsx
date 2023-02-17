import Header from '../components/privacy/Header';
import List from '../components/privacy/List';

export default function Privacy(): JSX.Element {
  return (
    <div className="w-1/2 m-auto py-10">
      <div className="space-y-4">
        <div>
          <Header>Privacy policy</Header>
          This Privacy Policy sets out how we process the information we collect on soundbatch.org and explains why we need to collect certain information about you.
          Therefore, please read this Privacy Policy before using soundbatch.org.
          We care about your personal data and are committed to ensuring its confidentiality and protection.
        </div>
        <div>
          <Header>Personal data we collect</Header>
          When you visit soundbatch.org, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some cookies installed on your device.
          In addition, we may collect personal data that you provide to us at the registration stage to enable the performance of the contract.
        </div>
        <div>
          <Header>Why do we process your data?</Header>
          Our overriding priority is to ensure the security of your data, therefore we can only process limited data, only to the extent that it is strictly necessary to maintain the operation of the Site.
          Information collected automatically is used only to identify potential cases of abuse and to compile statistical data on the use of our Website.
          These statistical data are not collected in a way that allows the identification of a specific user of the system.
          You can visit our Website without having to tell us who you are or provide any information that could identify you as a specific, identifiable person.
          However, if you wish to use some of the Site's features or provide other information by filling out a form, you may provide us with your personal information, such as your email address.
          You may choose not to provide us with your personal information, but then you may not be able to use some of the Site's features.
          For example, we will not be able to verify that it is you during a password reset attempt.
          Users who are unsure which information is mandatory may contact us at praktykizsk@gmail.com.
        </div>
        <div>
          <Header>Your rights</Header>
          If you are a citizen of the European Union, you have the following rights related to your personal data:
          <List elements={[
            {
              value: 'Right to be informed.',
            },
            {
              value: 'Right of Access to Information.',
            },
            {
              value: 'The right to correct data.',
            },
            {
              value: 'The right to delete data.',
            },
            {
              value: 'Right to restriction of data processing.',
            },
            {
              value: 'The right to reserve the method of data processing.',
            },
            {
              value: 'Right to object.',

            },
            {
              value: 'Rights relating to automated decision-making and profiling.',
            },
          ]} />

        </div>
        <div>
          <Header>Data protection</Header>
          We ensure the security of information provided by the user on computer servers in a controlled, secure environment, protected against unauthorized access, use or disclosure. As part of control and supervision, we apply appropriate safeguards to protect against unauthorized access, use, modification and disclosure of personal data. However, we cannot guarantee the security of data transmission over the internet or wireless network.
        </div>
        <div>
          <Header>Disclosure of information resulting from the provisions of law</Header>
          Any information we collect, use or receive will be disclosed as required or required by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, your safety or the safety of others, to detect fraud, or to respond to government requests.
        </div>
        <div>
          <Header>Contact info:</Header>
          If you want to contact us for more information about this Privacy Policy or any matter related to your rights and personal data, you can send an e-mail to praktykizsk@gmail.com.
        </div>
      </div>
    </div>
  );
}
