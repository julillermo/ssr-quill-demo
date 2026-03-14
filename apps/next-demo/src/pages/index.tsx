import { EditorContainer } from "@/components/EditorContainer";
import { RendererContainer } from "@/components/RendererContainer";
import { QDeltaProvider } from "@/context-providers/QDelta";
import * as layout from "@/styles/App.css";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import type { Delta } from "quill";
import { useState } from "react";

export default function Home({ title }: HomeProps) {
  const [deltaDocument, setDeltaDocument] = useState<Delta | null>(null);

  return (
    <main className={layout.page}>
      <div className={layout.pageHeader}>
        <p className={layout.eyebrow}>Demo</p>
        <h1 className={layout.pageHeading}>{title}</h1>
        <p className={layout.pageSub}>
          Draft rich text on the left, publish to preview the rendered output
          and raw delta on the right.
        </p>
        <p className={layout.pageSub}>
          This is a server-side rendered fork of the Learning-WYSIWYG project to
          demonstrate how to implement Quill.js implementation in a
          server-rendered framework like Next.js
        </p>
      </div>

      <QDeltaProvider delta={deltaDocument} setDelta={setDeltaDocument}>
        <section className={layout.shell}>
          <EditorContainer />
          <RendererContainer />
        </section>
      </QDeltaProvider>
    </main>
  );
}

type HomeProps = {
  title: string;
};
export const getServerSideProps: GetServerSideProps = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const title = "Server-Side rendered Quill Editor";

  return {
    props: {
      title,
    },
  };
};
