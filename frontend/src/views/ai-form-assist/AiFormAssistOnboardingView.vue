<script setup lang="ts">
import { CalloutSection, PageHero, ProcessSteps } from '@/components/content';
import { RouteNames } from '@/utils/constants';

const goodFitSignals = [
  'Complex application forms or permit processes',
  'Frequent questions from applicants before submitting a webform',
  'High rates of incomplete or unclear applications',
  'Program rules that can be explained using approved guidance and regulations',
  'Staff time spent following up for missing information',
  'A need to improve applicant experience without rebuilding the full system'
];

// TODO(content): confirm who prepares each item
const requirements = [
  {
    item: 'Your web form',
    purpose:
      'A page where one script tag can be added, plus its web addresses. Only approved addresses can use your assistant.',
    preparedBy: 'Your team'
  },
  {
    item: 'Approved knowledge content',
    purpose:
      'The web pages, PDFs, and policy documents the assistant answers from. They are indexed in Azure AI Search.',
    preparedBy: 'Your team'
  },
  {
    item: 'A walkthrough of each form step',
    purpose:
      "The fields, options, and rules on each step. These become one form definition per step, so field IDs must match the IDs or names in your page's HTML.",
    preparedBy: 'Together'
  },
  {
    item: 'Step guidance',
    purpose:
      "What applicants typically ask on each step. This becomes a prompt template for the step. Agent instructions start from an existing tenant's.",
    preparedBy: 'Together'
  },
  {
    item: 'Calculations (optional)',
    purpose:
      'Business rules such as fee calculations and database lookups. Example tools include livestock water use and fishing licence fees; a new tool needs development work.',
    preparedBy: 'Together'
  },
  {
    item: 'Support contact and reviewers',
    purpose:
      "Your own wording for when the assistant can't answer, with your support contact, and a subject-matter expert to review answers during testing.",
    preparedBy: 'Your team'
  },
  {
    item: 'Technical Support',
    purpose: 'Our team are available to provide technical support for the integration and operation of the assistant.',
    preparedBy: 'Our team'
  }
];

const onboardingSteps = [
  {
    title: 'Intake',
    description: 'Contact us to talk through your form, your applicants, and what you want the assistant to help with.'
  },
  {
    title: 'Discovery and scope',
    description:
      'Together we walk through the form and your content, and agree which steps, knowledge sources, and types of assistance are in scope.'
  },
  {
    title: 'Content preparation',
    description:
      'Your knowledge sources are indexed, and the form definitions and prompts are written for each step - a refinement process to ensure accuracy and relevance.'
  },
  {
    title: 'Tenant setup',
    description:
      "We create your client profile, with your client ID, approved web addresses, and enabled agents, and publish your tenant's client script."
  },
  {
    title: 'Integrate and test',
    description:
      "You add the script tag to your form's development environment. Subject-matter experts test the answers while we tune the prompts."
  },
  {
    title: 'Go live',
    description: 'Your configuration is promoted to the test environment, then to production.'
  }
];

// The closing tag is split so it doesn't end this <script> block
const integrationSnippet = [
  '<script type="module" src="https://<client-script-host>/scripts/tenants/<tenant>/client.js"></' + 'script>',
  ''
].join('\n');
</script>

<template>
  <div class="w-full max-w-[75rem]">
    <PageHero title="Onboarding to AI Form Assist">
      Bring AI-powered guidance to your program's application forms. Here's what you'll need and how onboarding works.
      <template #actions>
        <router-link
          :to="{ name: RouteNames.CONTACT }"
          class="btn btn-primary"
        >
          Contact Us
        </router-link>
      </template>
    </PageHero>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>Is This a Good Fit for Your Program?</h2>
      <p class="mt-2 font-bold">AI Form Assist may be a good fit if your program has:</p>
      <ul class="mt-4 list-disc space-y-2 pl-6 text-[var(--bc-text)]">
        <li
          v-for="signal in goodFitSignals"
          :key="signal"
        >
          {{ signal }}
        </li>
      </ul>
    </section>

    <section
      id="what-youll-bring"
      class="border-t border-[var(--bc-border)] py-4"
    >
      <h2>What You'll Bring</h2>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full border-collapse text-left text-[var(--bc-text)]">
          <thead>
            <tr class="border-b-2 border-[var(--bc-border-medium)]">
              <th class="py-2 pr-4">What</th>
              <th class="py-2 pr-4">Why it's needed</th>
              <th class="whitespace-nowrap py-2">Prepared by</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in requirements"
              :key="row.item"
              class="border-b border-[var(--bc-border)] align-top"
            >
              <td class="py-3 pr-4 font-bold">{{ row.item }}</td>
              <td class="py-3 pr-4">{{ row.purpose }}</td>
              <td class="whitespace-nowrap py-3">{{ row.preparedBy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>How Onboarding Works</h2>
      <!-- Limits the steps to 800px at the default font size; the section's top border stays full width -->
      <ProcessSteps
        class="max-w-[60rem]"
        :steps="onboardingSteps"
      />
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>For Developers</h2>
      <p>Here is a high-level overview of some coding steps required:</p>

      <ul>
        <li>
          To add the Assistant in your own web-page, you will need to link to load our client.js file:

          <pre><code>{{ integrationSnippet }}</code></pre>

          <p>
            We can modify the core client.js file as needed to customize the chat features. You will need to add your
            AIFA tenant ID and may wish to set specific configuration options.
          </p>
        </li>

        <li>
          <p>
            To use the
            <strong>Form Support Agent</strong>
            , add
            <code>data-id</code>
            attributes to your form fields to help the assistant identify them more reliably. This is optional but
            recommended for better form-filling accuracy.
          </p>

          <p class="mt-2 text-[var(--bc-text)]">
            You will need a
            <strong>form definition</strong>
            and
            <strong>prompt templates</strong>
            to give context to AI about your webform. (See the
            <router-link :to="{ name: RouteNames.AI_FORM_ASSIST_DEMO }">demo</router-link>
            for code examples.)
          </p>
        </li>
      </ul>

      <p>
        All of this code can be managed together through our
        <a
          href="https://github.com/bcgov/ai-form-client"
          target="_blank"
          rel="noopener noreferrer"
        >
          ai-form-client
        </a>
        repo on GitHub.
      </p>
    </section>

    <CalloutSection title="Ready to Get Started?">
      <p class="mt-2 text-[var(--bc-text)]">Contact us to begin the intake conversation.</p>
      <router-link
        :to="{ name: RouteNames.CONTACT }"
        class="btn btn-primary mt-4"
      >
        Contact Us
      </router-link>
    </CalloutSection>
  </div>
</template>
