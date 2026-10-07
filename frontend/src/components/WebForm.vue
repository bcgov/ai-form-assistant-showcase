<script setup>
import { ref, computed } from 'vue';
import { Message } from '@/lib/primevue';

// ----- Form Data -----
const formData = ref({
  angler_age_range: '',
  wid: '',
  residency: '',
  licenceDuration: '',
  seniorRate: false,
  disabilityReduction: false,
  coeNumber: '',
  location: '',
  classifiedWaters: false,
  classifiedWaterName: '',
  surcharge: []
});

// age range options
const angler_age_range_options = [
  { label: 'Under 16', value: 'child' },
  { label: '16 and over', value: 'adult' }
];

// Residency options
const residencyOptions = [
  { label: 'BC Resident', value: 'resident' },
  { label: 'Non-Resident (Canadian)', value: 'non-resident' },
  { label: 'Non-Resident Alien (non-Canadian)', value: 'alien' }
];

// Licence duration options
const licenceDurationOptions = [
  { label: 'One-Day', value: 'one-day' },
  { label: 'Eight-Day', value: 'eight-day' },
  { label: 'Annual (Apr 1 - Mar 31)', value: 'annual' }
];

// Location options (9 regions)
const locationOptions = [
  { label: 'Region 1 - Vancouver Island (includes Haida Gwaii: WMU 6-12, 6-13)', value: 'region1' },
  { label: 'Region 2 - Lower Mainland', value: 'region2' },
  { label: 'Region 3 - Thompson', value: 'region3' },
  { label: 'Region 4 - Kootenay', value: 'region4' },
  { label: 'Region 5 - Cariboo', value: 'region5' },
  { label: 'Region 6 - Skeena', value: 'region6' },
  { label: 'Region 7A - Omineca', value: 'region7a' },
  { label: 'Region 7B - Peace', value: 'region7b' },
  { label: 'Region 8 - Okanagan', value: 'region8' }
];

// Conservation surcharge options
const surchargeOptions = [
  { label: 'Steelhead', value: 'steelhead' },
  { label: 'Non-Tidal Salmon', value: 'salmon' },
  { label: 'Kootenay/Shuswap Rainbow Trout or Char', value: 'rainbow-char' },
  { label: 'White Sturgeon Conservation Licence', value: 'sturgeon' }
];

// ----- Calculated Price -----
const calculatedPrice = computed(() => {
  return (0.0).toFixed(2);
});

const submitForm = () => {
  // console.log('Form submitted:', formData.value);
  // Add your form submission logic here
};

const resetForm = () => {
  formData.value = {
    angler_age_range: '',
    wid: '',
    licenceDuration: '',
    seniorRate: false,
    disabilityReduction: false,
    coeNumber: '',
    residency: '',
    location: '',
    classifiedWaters: false,
    classifiedWaterName: '',
    surcharge: []
  };
};
</script>
<template>
  <div class="form-container">
    <h1 class="m-0">AI Form-Assist Demo</h1>

    <h2>Sample Permit Application (the webform)</h2>
    <p>
      For this demo, we'll simulate the experience of someone applying for a
      <strong>fishing licence</strong>
      .
      <br />
      For information on freshwater fishing
      <a
        href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence"
        target="_blank"
      >
        licences
      </a>
      and fishing
      <a
        href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/fishing-regulations"
        target="_blank"
      >
        regulations
      </a>
      in B.C., refer to the
      <a
        href="https://www2.gov.bc.ca/gov/content?id=78F8FA0205454970B14CC3537F46829A"
        target="_blank"
      >
        Freshwater Fishing in B.C. webpages
      </a>
      .
    </p>

    <Message
      severity="info"
      class="hidden"
    >
      This is not a tidal (saltwater) licence. Freshwater fishing licences do not include fishing in British Columbia's
      coastal tidal waters. Tidal (saltwater) fishing regulations and licences are under the jurisdiction of the
      Canadian federal government. For more information and licence purchase visit the
      <a
        href="https://recfish-pechesportive.dfo-mpo.gc.ca/nrls-sndpp/index-eng.cfm"
        target="_blank"
      >
        Department of Fisheries and Oceans
      </a>
      website.
    </Message>
    <form
      name="fishing-licence-form"
      class="mt-16"
      @submit.prevent="submitForm"
    >
      <!-- Applicant Information -->
      <fieldset>
        <legend>Angler Information</legend>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="angler_age_range_help"
          class="helpLink"
        />

        <label for="angler_age_range">Age</label>
        <select
          v-model="formData.angler_age_range"
          data-id="angler_age_range"
          class="w-full mb-5"
        >
          <option value="">please select</option>
          <option
            v-for="option in angler_age_range_options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Residency Status -->

        <div class="form-group mb-6">
          <label for="residency">Residency Status</label>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="residency_help"
            class="helpLink"
          />
          <div
            v-for="option in residencyOptions"
            :key="option.value"
            class="radio-option"
          >
            <input
              :id="'residency_' + option.value"
              v-model="formData.residency"
              type="radio"
              :value="option.value"
              :data-id="'residency_' + option.value"
            />
            <label
              :for="'residency_' + option.value"
              class="ml-2"
            >
              {{ option.label }}
            </label>
          </div>
        </div>

        <label for="wid">Fish and Wildlife ID (WID)</label>
        <small>Leave blank if you need to register for a new WID.</small>
        <input
          id="wid"
          v-model="formData.wid"
          type="text"
          data-id="wid"
          class="w-full"
        />
      </fieldset>

      <!-- Licence Type -->
      <fieldset>
        <legend>Fishing Licence Type</legend>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="licenceDuration_help"
          class="helpLink"
        />
        <label for="licenceDuration">Duration</label>
        <select
          id="licenceDuration"
          v-model="formData.licenceDuration"
          data-id="licenceDuration"
          class="w-full mb-2"
        >
          <option value="">please select</option>
          <option
            v-for="option in licenceDurationOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <div class="checkbox-option">
          <input
            id="seniorRate"
            v-model="formData.seniorRate"
            type="checkbox"
            data-id="seniorRate"
          />
          <label
            for="seniorRate"
            class="ml-2"
          >
            I am 65 or older (resident annual rate)
          </label>
        </div>

        <div class="checkbox-option">
          <input
            id="disabilityReduction"
            v-model="formData.disabilityReduction"
            type="checkbox"
            data-id="disabilityReduction"
          />
          <label
            for="disabilityReduction"
            class="ml-2"
          >
            I hold a Certificate of Eligibility for the fee reduction program (severe and permanent disability)
          </label>
        </div>

        <template v-if="formData.disabilityReduction">
          <label for="coeNumber">Certificate of Eligibility Number</label>
          <input
            id="coeNumber"
            v-model="formData.coeNumber"
            type="text"
            data-id="coeNumber"
            class="w-full"
          />
        </template>
      </fieldset>

      <!-- Fishing Region -->
      <fieldset>
        <legend>Fishing Region</legend>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="location_help"
          class="helpLink"
        />
        <select
          v-model="formData.location"
          data-id="location"
          class="w-full"
        >
          <option value="">please select</option>
          <option
            v-for="option in locationOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </fieldset>

      <!-- Classified Waters Licence -->
      <fieldset>
        <legend>Classified Waters Licence</legend>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="classifiedWaters_help"
          class="helpLink"
        />
        <div class="checkbox-option">
          <input
            id="classifiedWaters"
            v-model="formData.classifiedWaters"
            type="checkbox"
            data-id="classifiedWaters"
          />
          <label
            for="classifiedWaters"
            class="ml-2"
          >
            Add a Classified Waters Licence
          </label>
        </div>

        <template v-if="formData.classifiedWaters">
          <label for="classifiedWaterName">Water Name / Region</label>
          <small>E.g. Dean River, Skagit River, Kootenay region rivers.</small>
          <input
            id="classifiedWaterName"
            v-model="formData.classifiedWaterName"
            type="text"
            data-id="classifiedWaterName"
            class="w-full"
          />
        </template>
      </fieldset>

      <!-- Conservation Surcharge Stamps -->
      <fieldset>
        <legend>Conservation Surcharge Stamps</legend>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="surcharge_help"
          class="helpLink"
        />
        <div
          v-for="option in surchargeOptions"
          :key="option.value"
          class="checkbox-option"
        >
          <input
            :id="'surcharge_' + option.value"
            v-model="formData.surcharge"
            type="checkbox"
            :value="option.value"
            :data-id="'surcharge_' + option.value"
          />
          <label
            :for="'surcharge_' + option.value"
            class="ml-2"
          >
            {{ option.label }}
          </label>
        </div>
      </fieldset>

      <!-- Estimated Cost -->
      <fieldset>
        <legend>Estimated Licence Cost</legend>
        <input
          id="estimatedCost"
          :value="calculatedPrice"
          type="text"
          data-id="estimatedCost"
          class="w-full"
          readonly
        />
      </fieldset>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
          class="btn btn-primary"
          @click="submitForm"
        >
          ✓ Submit
        </button>
        <button
          class="btn btn-secondary"
          @click="resetForm"
        >
          ✕ Reset
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
