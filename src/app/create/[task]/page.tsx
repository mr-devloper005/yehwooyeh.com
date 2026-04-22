"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Home, Save } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { ContentImage } from "@/components/shared/content-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "List a property",
    description:
      "Publish a rental or sale listing with photos, location, and highlights—stored in your browser until a live feed is connected.",
    fields: [
      { key: "title", label: "Property headline", type: "text", required: true },
      { key: "summary", label: "Short teaser (shown in cards)", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "City / neighborhood", type: "text" },
      { key: "address", label: "Street address", type: "text" },
      { key: "website", label: "Virtual tour or listing URL", type: "url" },
      { key: "email", label: "Contact email", type: "text" },
      { key: "phone", label: "Contact phone", type: "text" },
      { key: "logo", label: "Hero image URL (optional)", type: "url" },
      { key: "images", label: "Gallery image URLs", type: "images" },
      { key: "highlights", label: "Key features (comma-separated)", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <NavbarShell />
        <main className="mx-auto max-w-lg px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">This create flow is not available</h1>
          <p className="mt-3 text-slate-600">This content type is not enabled for Yehwooyeh right now.</p>
          <Button className="mt-8 rounded-md bg-blue-600 text-white hover:bg-blue-700" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const isListing = taskKey === "listing";

  const listingTips = [
    "Use horizontal, well-lit photos—first image becomes the hero in many layouts.",
    "Paste multiple gallery URLs separated by commas (Unsplash or your CDN links work).",
    "Mention HOA, utilities, parking, and pet policy in the full description when relevant.",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavbarShell />

      {isListing ? (
        <header className="relative min-h-[200px] overflow-hidden sm:min-h-[240px]">
          <div className="absolute inset-0">
            <ContentImage
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/78" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-12">
            <div>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to listings
              </Link>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Create</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">{formConfig.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">{formConfig.description}</p>
            </div>
            <Button
              variant="outline"
              asChild
              className="w-fit shrink-0 border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </header>
      ) : (
        <div className="border-b border-slate-200 bg-slate-900">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <Button variant="ghost" size="icon" asChild className="mt-0.5 shrink-0 text-white hover:bg-white/10">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Create</p>
                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{formConfig.title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">{formConfig.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <div className={isListing ? "grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start" : ""}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-md border-0 bg-blue-600 text-white">{taskConfig.label}</Badge>
              <Badge variant="outline" className="rounded-md border-slate-200 text-slate-600">
                Saved in this browser
              </Badge>
            </div>

            {!isListing ? (
              <div className="mt-6 flex items-center gap-2 border-b border-slate-100 pb-6 lg:hidden">
                <Button variant="ghost" size="sm" asChild className="text-slate-600">
                  <Link href="/" className="inline-flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Link>
                </Button>
              </div>
            ) : null}

            <div className="mt-6 grid gap-6">
              {formConfig.fields.map((field) => (
                <div key={field.key} className="grid gap-2">
                  <Label className="text-slate-700">
                    {field.label} {field.required ? <span className="text-red-500">*</span> : null}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      rows={field.key === "description" ? 6 : 4}
                      placeholder={field.placeholder}
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className="rounded-lg border border-slate-200 bg-white text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500/30"
                    />
                  ) : field.type === "category" ? (
                    <select
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                    >
                      <option value="">Select category</option>
                      {CATEGORY_OPTIONS.map((option) => (
                        <option key={option.slug} value={option.slug}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div className="grid gap-3">
                      <Input
                        type="file"
                        accept="application/pdf"
                        className="cursor-pointer border-slate-200 bg-white"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          if (file.type !== "application/pdf") {
                            toast({
                              title: "Invalid file",
                              description: "Please upload a PDF file.",
                            });
                            return;
                          }
                          const reader = new FileReader();
                          setUploadingPdf(true);
                          reader.onload = () => {
                            const result = typeof reader.result === "string" ? reader.result : "";
                            updateValue(field.key, result);
                            setUploadingPdf(false);
                            toast({
                              title: "PDF uploaded",
                              description: "File is stored locally.",
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Or paste a PDF URL"
                        value={values[field.key] || ""}
                        onChange={(event) => updateValue(field.key, event.target.value)}
                        className="h-11 border-slate-200 bg-white"
                      />
                      {uploadingPdf ? <p className="text-xs text-slate-500">Uploading PDF…</p> : null}
                    </div>
                  ) : (
                    <Input
                      type={field.type === "number" ? "number" : "text"}
                      placeholder={
                        field.type === "images" || field.type === "tags" || field.type === "highlights"
                          ? "Separate values with commas"
                          : field.placeholder
                      }
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className="h-11 rounded-lg border border-slate-200 bg-white text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500/30"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                onClick={handleSubmit}
                className="h-11 rounded-md bg-blue-600 px-6 text-base font-semibold text-white hover:bg-blue-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save draft locally
              </Button>
              <Button variant="outline" asChild className="h-11 rounded-md border-slate-200 bg-white">
                <Link href={taskConfig.route} className="inline-flex items-center gap-2">
                  View live {taskConfig.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              After save you will open a local preview URL. Sign in is required before your first save.
            </p>
          </div>

          {isListing ? (
            <aside className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-200">Quality checklist</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-200">
                {listingTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
                Need help with copy or pricing?{" "}
                <Link href="/contact" className="font-medium text-blue-300 hover:underline">
                  Contact the team
                </Link>
                .
              </div>
            </aside>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
