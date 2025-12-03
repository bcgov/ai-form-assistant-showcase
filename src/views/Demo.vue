<template>
  <main>

    <h1>Housing Permit Application</h1>

    <form action="/submit-permit" method="POST" enctype="multipart/form-data">

      <!-- Applicant Information -->
      <section>
        <h2>Applicant Information</h2>
        <label for="applicantName">Full Name</label>
        <input type="text" id="applicantName" name="applicantName" required>

        <label for="applicantEmail">Email Address</label>
        <input type="email" id="applicantEmail" name="applicantEmail" required>

        <label for="applicantPhone">Phone Number</label>
        <input type="tel" id="applicantPhone" name="applicantPhone" required>

        <label for="applicantAddress">Mailing Address</label>
        <input type="text" id="applicantAddress" name="applicantAddress" required>
      </section>

      <!-- Property Information -->
      <section>
        <h2>Property Information</h2>
        <label for="propertyAddress">Property Address</label>
        <input type="text" id="propertyAddress" name="propertyAddress" required>

        <label for="propertyID">Property ID (PID)</label>
        <input type="text" id="propertyID" name="propertyID" required>

        <label for="zoning">Zoning</label>
        <input type="text" id="zoning" name="zoning">
      </section>

      <!-- Project Details -->
      <section>
        <h2>Project Details</h2>
        <label for="projectType">Type of Work</label>
        <select id="projectType" name="projectType" required>
          <option value="">--Select--</option>
          <option value="new_construction">New Construction</option>
          <option value="renovation">Renovation</option>
          <option value="demolition">Demolition</option>
          <option value="addition">Addition</option>
          <option value="other">Other</option>
        </select>

        <label for="projectDescription">Project Description</label>
        <textarea id="projectDescription" name="projectDescription" rows="4" required></textarea>

        <label for="estimatedValue">Estimated Project Value (CAD)</label>
        <input type="number" id="estimatedValue" name="estimatedValue" required>

        <!-- Dynamic Fields -->
        <div id="newConstructionFields" class="hidden">
          <label for="floors">Number of Floors</label>
          <input type="number" id="floors" name="floors" min="1">

          <label for="squareFootage">Total Square Footage</label>
          <input type="number" id="squareFootage" name="squareFootage">
        </div>

        <div id="renovationFields" class="hidden">
          <label for="renovationType">Type of Renovation</label>
          <input type="text" id="renovationType" name="renovationType">
        </div>

        <div id="demolitionFields" class="hidden">
          <label for="demolitionReason">Reason for Demolition</label>
          <textarea id="demolitionReason" name="demolitionReason" rows="3"></textarea>
        </div>

        <div id="additionFields" class="hidden">
          <label for="additionSize">Size of Addition (sq ft)</label>
          <input type="number" id="additionSize" name="additionSize">
        </div>
      </section>

      <!-- Contractor Information -->
      <section>
        <h2>Contractor Information</h2>
        <label for="contractorName">Contractor Name</label>
        <input type="text" id="contractorName" name="contractorName">

        <label for="contractorLicense">Contractor License Number</label>
        <input type="text" id="contractorLicense" name="contractorLicense">
      </section>

      <!-- Document Uploads -->
      <section>
        <h2>Supporting Documents</h2>
        <label for="sitePlan">Site Plan / Plot Plan (PDF, JPG, PNG)</label>
        <input type="file" id="sitePlan" name="sitePlan" accept=".pdf,.jpg,.jpeg,.png" required>

        <label for="floorPlans">Floor Plans / Architectural Drawings (PDF)</label>
        <input type="file" id="floorPlans" name="floorPlans" accept=".pdf" required>

        <label for="structuralDrawings">Structural Drawings (PDF)</label>
        <input type="file" id="structuralDrawings" name="structuralDrawings" accept=".pdf">

        <label for="otherDocuments">Other Supporting Documents</label>
        <input type="file" id="otherDocuments" name="otherDocuments" multiple>
      </section>

      <!-- Declaration -->
      <section>
        <h2>Declaration</h2>
        <p>
          I hereby certify that the information provided is true and correct to the best of my knowledge.
        </p>
        <label>
          <input type="checkbox" name="declaration" required> I agree
        </label>
      </section>

      <button type="submit">Submit Application</button>
    </form>

    <section hidden>
      <p>Your name: {{ kc.tokenParsed?.preferred_username }}</p>
      <p>Your token expires at: {{ new Date(kc.tokenParsed?.exp * 1000).toLocaleString() }}</p>
    </section>
    
  </main>
</template>

<script setup>
import { inject } from "vue";
const kc = inject("keycloak");
</script>
