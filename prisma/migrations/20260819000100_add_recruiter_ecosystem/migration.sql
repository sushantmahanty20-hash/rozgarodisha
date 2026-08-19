
-- CreateEnum
CREATE TYPE "agency_type" AS ENUM ('RECRUITMENT_CONSULTANCY', 'MANPOWER_SUPPLY', 'STAFFING_COMPANY', 'PLACEMENT_CONSULTANCY', 'EXECUTIVE_SEARCH', 'HR_CONSULTANCY', 'OUTSOURCING', 'CONTRACT_STAFFING', 'OTHER');

-- CreateEnum
CREATE TYPE "agency_verification_status" AS ENUM ('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "geographic_coverage" AS ENUM ('LOCAL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "client_status" AS ENUM ('ACTIVE', 'INACTIVE', 'PROSPECT');

-- CreateEnum
CREATE TYPE "requirement_status" AS ENUM ('OPEN', 'ON_HOLD', 'CLOSED');

-- CreateEnum
CREATE TYPE "requirement_priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "candidate_source" AS ENUM ('JOBPORTAL', 'AGENCY_DATABASE', 'REFERRAL', 'LINKEDIN', 'WEBSITE', 'WALK_IN', 'EMPLOYEE_REFERRAL', 'DIRECT_APPLICATION', 'OTHER');

-- CreateEnum
CREATE TYPE "candidate_consent_status" AS ENUM ('CONSENT_REQUESTED', 'CONSENT_GRANTED', 'CONSENT_WITHDRAWN', 'CONSENT_EXPIRED', 'NO_CONSENT');

-- CreateEnum
CREATE TYPE "submission_status" AS ENUM ('SOURCED', 'SCREENING', 'SUBMITTED', 'CLIENT_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'OFFER', 'OFFER_ACCEPTED', 'JOINED', 'REJECTED', 'WITHDRAWN', 'ON_HOLD', 'REPLACEMENT');

-- CreateEnum
CREATE TYPE "offer_status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'NEGOTIATION', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "placement_status" AS ENUM ('ACTIVE', 'JOINED', 'REPLACEMENT_REQUIRED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "fee_type" AS ENUM ('FIXED_FEE', 'PERCENTAGE_OF_SALARY', 'PER_CANDIDATE', 'MONTHLY_STAFFING', 'CUSTOM');

-- CreateEnum
CREATE TYPE "fee_status" AS ENUM ('EXPECTED', 'INVOICED', 'PENDING', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "invoice_status" AS ENUM ('DRAFT', 'SENT', 'PARTIALLY_PAID', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "team_role" AS ENUM ('AGENCY_OWNER', 'RECRUITMENT_MANAGER', 'SENIOR_RECRUITER', 'RECRUITER', 'RECRUITMENT_COORDINATOR', 'ACCOUNT_MANAGER', 'FINANCE', 'VIEWER');

-- CreateEnum
CREATE TYPE "recruiter_document_category" AS ENUM ('RESUME', 'CANDIDATE_ID', 'EDUCATION_CERT', 'EXPERIENCE_CERT', 'REQUIREMENT_DOC', 'RECRUITMENT_AGREEMENT', 'OFFER_LETTER', 'JOINING_CONFIRMATION', 'INVOICE_DOC', 'PAYMENT_PROOF', 'BUSINESS_REG', 'GST_CERT', 'PAN_DOC', 'LICENSE', 'OFFICE_PROOF', 'OTHER');

-- CreateEnum
CREATE TYPE "document_visibility" AS ENUM ('PRIVATE', 'TEAM', 'CLIENT', 'PUBLIC');

-- AlterEnum
ALTER TYPE "interview_status" ADD VALUE 'RESCHEDULED';

-- CreateTable
CREATE TABLE "recruiter_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agencyName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "agencyType" "agency_type" NOT NULL DEFAULT 'RECRUITMENT_CONSULTANCY',
    "about" TEXT,
    "logo" TEXT,
    "website" TEXT,
    "businessEmail" TEXT,
    "businessPhone" TEXT,
    "officeAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "zipCode" TEXT,
    "yearEstablished" INTEGER,
    "numEmployees" INTEGER,
    "numRecruiters" INTEGER,
    "industriesServed" TEXT,
    "specializations" TEXT,
    "geographicCoverage" "geographic_coverage" NOT NULL DEFAULT 'LOCAL',
    "registrationNumber" TEXT,
    "gstin" TEXT,
    "panNumber" TEXT,
    "recruitmentLicense" TEXT,
    "verificationStatus" "agency_verification_status" NOT NULL DEFAULT 'PENDING',
    "verificationNote" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_team_members" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "designation" TEXT NOT NULL,
    "role" "team_role" NOT NULL DEFAULT 'RECRUITER',
    "permissions" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_clients" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "industry" TEXT,
    "companySize" TEXT,
    "website" TEXT,
    "address" TEXT,
    "contactPerson" TEXT,
    "designation" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "gstin" TEXT,
    "contractStartDate" TIMESTAMP(3),
    "contractEndDate" TIMESTAMP(3),
    "agreementUrl" TEXT,
    "paymentTerms" TEXT,
    "replacementPeriodDays" INTEGER,
    "feeType" "fee_type",
    "feeValue" DECIMAL(12,2),
    "status" "client_status" NOT NULL DEFAULT 'ACTIVE',
    "relationshipStartDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_client_contacts" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "recruiter_client_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruitment_requirements" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "openings" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "responsibilities" TEXT,
    "requiredSkills" TEXT,
    "preferredSkills" TEXT,
    "experienceMin" INTEGER,
    "experienceMax" INTEGER,
    "education" TEXT,
    "salaryMin" DECIMAL(12,2),
    "salaryMax" DECIMAL(12,2),
    "salaryCurrency" TEXT NOT NULL DEFAULT 'INR',
    "location" TEXT,
    "workMode" "work_mode",
    "employmentType" "employment_type",
    "shift" TEXT,
    "noticePeriod" TEXT,
    "travelRequired" BOOLEAN NOT NULL DEFAULT false,
    "joiningDeadline" TIMESTAMP(3),
    "priority" "requirement_priority" NOT NULL DEFAULT 'MEDIUM',
    "clientContactId" TEXT,
    "recruiterAssignedId" TEXT,
    "status" "requirement_status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_candidates" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "createdBy" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "location" TEXT,
    "currentTitle" TEXT,
    "totalExperienceYrs" DECIMAL(5,2),
    "skills" TEXT,
    "education" TEXT,
    "expectedSalary" DECIMAL(12,2),
    "currentSalary" DECIMAL(12,2),
    "noticePeriod" TEXT,
    "preferredLocation" TEXT,
    "resumeUrl" TEXT,
    "source" "candidate_source" NOT NULL DEFAULT 'AGENCY_DATABASE',
    "sourceDetail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "availability" TEXT,
    "lastContactedAt" TIMESTAMP(3),
    "consentStatus" "candidate_consent_status" NOT NULL DEFAULT 'NO_CONSENT',
    "consentDate" TIMESTAMP(3),
    "consentPurpose" TEXT,
    "consentExpiresAt" TIMESTAMP(3),
    "isMarketplaceVisible" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_submissions" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "submittedBy" TEXT,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedSalary" DECIMAL(12,2),
    "noticePeriod" TEXT,
    "recruiterNotes" TEXT,
    "consentStatus" "candidate_consent_status",
    "resumeVersion" TEXT,
    "status" "submission_status" NOT NULL DEFAULT 'SOURCED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission_status_history" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "fromStatus" TEXT NOT NULL,
    "toStatus" TEXT NOT NULL,
    "changedBy" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submission_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_interviews" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT,
    "requirementId" TEXT,
    "submissionId" TEXT,
    "candidateId" TEXT NOT NULL,
    "interviewDate" TIMESTAMP(3) NOT NULL,
    "interviewType" "interview_type" NOT NULL,
    "location" TEXT,
    "meetingUrl" TEXT,
    "interviewer" TEXT,
    "feedback" TEXT,
    "status" "interview_status" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_offers" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "requirementId" TEXT,
    "submissionId" TEXT,
    "candidateId" TEXT NOT NULL,
    "offerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" TEXT NOT NULL,
    "salary" DECIMAL(12,2),
    "joiningDate" TIMESTAMP(3),
    "status" "offer_status" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_placements" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "requirementId" TEXT,
    "submissionId" TEXT,
    "candidateId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "salary" DECIMAL(12,2),
    "feeAmount" DECIMAL(12,2),
    "feeType" "fee_type",
    "recruiterAssignedId" TEXT,
    "placementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guaranteePeriodDays" INTEGER,
    "status" "placement_status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_placements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placement_replacements" (
    "id" TEXT NOT NULL,
    "placementId" TEXT NOT NULL,
    "replacementCandidateId" TEXT,
    "requiredDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'REQUESTED',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "placement_replacements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruitment_fees" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "requirementId" TEXT,
    "submissionId" TEXT,
    "placementId" TEXT,
    "candidateId" TEXT,
    "feeType" "fee_type" NOT NULL DEFAULT 'PERCENTAGE_OF_SALARY',
    "feeValue" DECIMAL(12,2),
    "salaryAmount" DECIMAL(12,2),
    "expectedFee" DECIMAL(12,2),
    "invoiceId" TEXT,
    "status" "fee_status" NOT NULL DEFAULT 'EXPECTED',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_invoices" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "amount" DECIMAL(12,2) NOT NULL,
    "tax" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "invoice_status" NOT NULL DEFAULT 'DRAFT',
    "pdfUrl" TEXT,
    "paidAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_payments" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "invoiceId" TEXT,
    "clientId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "method" TEXT,
    "transactionId" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recruiter_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_documents" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "candidateId" TEXT,
    "clientId" TEXT,
    "category" "recruiter_document_category" NOT NULL DEFAULT 'OTHER',
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER,
    "visibility" "document_visibility" NOT NULL DEFAULT 'PRIVATE',
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recruiter_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiter_reviews" (
    "id" TEXT NOT NULL,
    "recruiterProfileId" TEXT NOT NULL,
    "clientId" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "communication" INTEGER,
    "candidateQuality" INTEGER,
    "speed" INTEGER,
    "professionalism" INTEGER,
    "comment" TEXT,
    "isModerated" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recruiter_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recruiter_profiles_userId_key" ON "recruiter_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "recruiter_profiles_slug_key" ON "recruiter_profiles"("slug");

-- CreateIndex
CREATE INDEX "recruiter_profiles_userId_idx" ON "recruiter_profiles"("userId");

-- CreateIndex
CREATE INDEX "recruiter_profiles_verificationStatus_idx" ON "recruiter_profiles"("verificationStatus");

-- CreateIndex
CREATE INDEX "recruiter_profiles_slug_idx" ON "recruiter_profiles"("slug");

-- CreateIndex
CREATE INDEX "recruiter_team_members_recruiterProfileId_idx" ON "recruiter_team_members"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_clients_recruiterProfileId_idx" ON "recruiter_clients"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_clients_status_idx" ON "recruiter_clients"("status");

-- CreateIndex
CREATE INDEX "recruiter_client_contacts_clientId_idx" ON "recruiter_client_contacts"("clientId");

-- CreateIndex
CREATE INDEX "recruitment_requirements_recruiterProfileId_idx" ON "recruitment_requirements"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruitment_requirements_clientId_idx" ON "recruitment_requirements"("clientId");

-- CreateIndex
CREATE INDEX "recruitment_requirements_status_idx" ON "recruitment_requirements"("status");

-- CreateIndex
CREATE INDEX "recruiter_candidates_recruiterProfileId_idx" ON "recruiter_candidates"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_candidates_email_idx" ON "recruiter_candidates"("email");

-- CreateIndex
CREATE INDEX "recruiter_candidates_consentStatus_idx" ON "recruiter_candidates"("consentStatus");

-- CreateIndex
CREATE INDEX "candidate_submissions_recruiterProfileId_idx" ON "candidate_submissions"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "candidate_submissions_requirementId_idx" ON "candidate_submissions"("requirementId");

-- CreateIndex
CREATE INDEX "candidate_submissions_candidateId_idx" ON "candidate_submissions"("candidateId");

-- CreateIndex
CREATE INDEX "candidate_submissions_status_idx" ON "candidate_submissions"("status");

-- CreateIndex
CREATE INDEX "submission_status_history_submissionId_idx" ON "submission_status_history"("submissionId");

-- CreateIndex
CREATE INDEX "recruiter_interviews_recruiterProfileId_idx" ON "recruiter_interviews"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_interviews_status_idx" ON "recruiter_interviews"("status");

-- CreateIndex
CREATE INDEX "recruiter_interviews_interviewDate_idx" ON "recruiter_interviews"("interviewDate");

-- CreateIndex
CREATE INDEX "recruiter_offers_recruiterProfileId_idx" ON "recruiter_offers"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_offers_status_idx" ON "recruiter_offers"("status");

-- CreateIndex
CREATE INDEX "recruiter_placements_recruiterProfileId_idx" ON "recruiter_placements"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_placements_status_idx" ON "recruiter_placements"("status");

-- CreateIndex
CREATE INDEX "placement_replacements_placementId_idx" ON "placement_replacements"("placementId");

-- CreateIndex
CREATE INDEX "recruitment_fees_recruiterProfileId_idx" ON "recruitment_fees"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruitment_fees_clientId_idx" ON "recruitment_fees"("clientId");

-- CreateIndex
CREATE INDEX "recruitment_fees_status_idx" ON "recruitment_fees"("status");

-- CreateIndex
CREATE UNIQUE INDEX "recruiter_invoices_invoiceNumber_key" ON "recruiter_invoices"("invoiceNumber");

-- CreateIndex
CREATE INDEX "recruiter_invoices_recruiterProfileId_idx" ON "recruiter_invoices"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_invoices_clientId_idx" ON "recruiter_invoices"("clientId");

-- CreateIndex
CREATE INDEX "recruiter_invoices_invoiceNumber_idx" ON "recruiter_invoices"("invoiceNumber");

-- CreateIndex
CREATE INDEX "recruiter_payments_recruiterProfileId_idx" ON "recruiter_payments"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_documents_recruiterProfileId_idx" ON "recruiter_documents"("recruiterProfileId");

-- CreateIndex
CREATE INDEX "recruiter_documents_candidateId_idx" ON "recruiter_documents"("candidateId");

-- CreateIndex
CREATE INDEX "recruiter_reviews_recruiterProfileId_idx" ON "recruiter_reviews"("recruiterProfileId");

-- AddForeignKey
ALTER TABLE "recruiter_profiles" ADD CONSTRAINT "recruiter_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_team_members" ADD CONSTRAINT "recruiter_team_members_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_team_members" ADD CONSTRAINT "recruiter_team_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_clients" ADD CONSTRAINT "recruiter_clients_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_client_contacts" ADD CONSTRAINT "recruiter_client_contacts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_requirements" ADD CONSTRAINT "recruitment_requirements_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_requirements" ADD CONSTRAINT "recruitment_requirements_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_candidates" ADD CONSTRAINT "recruiter_candidates_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_candidates" ADD CONSTRAINT "recruiter_candidates_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_submissions" ADD CONSTRAINT "candidate_submissions_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_submissions" ADD CONSTRAINT "candidate_submissions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_submissions" ADD CONSTRAINT "candidate_submissions_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "recruitment_requirements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_submissions" ADD CONSTRAINT "candidate_submissions_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruiter_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission_status_history" ADD CONSTRAINT "submission_status_history_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "candidate_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_interviews" ADD CONSTRAINT "recruiter_interviews_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_interviews" ADD CONSTRAINT "recruiter_interviews_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_interviews" ADD CONSTRAINT "recruiter_interviews_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "recruitment_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_interviews" ADD CONSTRAINT "recruiter_interviews_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "candidate_submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_interviews" ADD CONSTRAINT "recruiter_interviews_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruiter_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_offers" ADD CONSTRAINT "recruiter_offers_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_offers" ADD CONSTRAINT "recruiter_offers_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_offers" ADD CONSTRAINT "recruiter_offers_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "recruitment_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_offers" ADD CONSTRAINT "recruiter_offers_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "candidate_submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_offers" ADD CONSTRAINT "recruiter_offers_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruiter_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_placements" ADD CONSTRAINT "recruiter_placements_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_placements" ADD CONSTRAINT "recruiter_placements_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_placements" ADD CONSTRAINT "recruiter_placements_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "recruitment_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_placements" ADD CONSTRAINT "recruiter_placements_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "candidate_submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_placements" ADD CONSTRAINT "recruiter_placements_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruiter_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_replacements" ADD CONSTRAINT "placement_replacements_placementId_fkey" FOREIGN KEY ("placementId") REFERENCES "recruiter_placements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_replacements" ADD CONSTRAINT "placement_replacements_replacementCandidateId_fkey" FOREIGN KEY ("replacementCandidateId") REFERENCES "recruiter_candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_fees" ADD CONSTRAINT "recruitment_fees_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_fees" ADD CONSTRAINT "recruitment_fees_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_fees" ADD CONSTRAINT "recruitment_fees_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "recruitment_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_fees" ADD CONSTRAINT "recruitment_fees_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "candidate_submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_fees" ADD CONSTRAINT "recruitment_fees_placementId_fkey" FOREIGN KEY ("placementId") REFERENCES "recruiter_placements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_fees" ADD CONSTRAINT "recruitment_fees_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruiter_candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_fees" ADD CONSTRAINT "recruitment_fees_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "recruiter_invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_invoices" ADD CONSTRAINT "recruiter_invoices_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_invoices" ADD CONSTRAINT "recruiter_invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_payments" ADD CONSTRAINT "recruiter_payments_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_payments" ADD CONSTRAINT "recruiter_payments_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "recruiter_invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_payments" ADD CONSTRAINT "recruiter_payments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_documents" ADD CONSTRAINT "recruiter_documents_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_documents" ADD CONSTRAINT "recruiter_documents_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "recruiter_candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_documents" ADD CONSTRAINT "recruiter_documents_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_documents" ADD CONSTRAINT "recruiter_documents_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_reviews" ADD CONSTRAINT "recruiter_reviews_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "recruiter_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_reviews" ADD CONSTRAINT "recruiter_reviews_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "recruiter_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

