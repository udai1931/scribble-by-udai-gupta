import React, { useEffect, useState } from "react";

import { Toastr } from "neetoui";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Form from "common/Form";
import Navbar from "common/Navbar";
import NewScheduleUpdateForm from "common/NewScheduleUpdateForm";
import RestoreModal from "common/RestoreModal";
import ScheduledUpdates from "common/ScheduledUpdates";
import VersionHistory from "common/VersionHistory";

function EditArticle() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [article, setArticle] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduleUpdateState, setScheduleUpdateState] = useState("draft");
  const [scheduledUpdates, setScheduledUpdates] = useState([]);

  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const res = await articlesApi.show(slug);
      setArticle({ ...res.data.article });
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.list();
      setCategories([...res.data.categories]);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchCategories();
    fetchVersions();
    fetchUpdateSchedules();
  }, []);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setBody(article.body);
      setCategory(article.category);
    }
  }, [article]);

  const fetchVersions = async () => {
    try {
      const res = await articlesApi.versions(slug);
      setVersions([...res.data.versions]);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleSubmit = async (e, state = "draft", tag = "drafted", version) => {
    e.preventDefault();
    setLoading(true);
    let articleObj = {};
    if (version) {
      articleObj = {
        title: version.title,
        body: version.body,
        category_id: version.category.value,
        state,
        tag,
      };
    } else {
      articleObj = { title, body, category_id: category.value, state, tag };
    }
    try {
      await articlesApi.update({
        slug: article.slug,
        payload: {
          article: articleObj,
        },
      });
      fetchVersions();
      fetchArticle();
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
      setShowRestoreModal(false);
    }
  };

  const fetchUpdateSchedules = async () => {
    try {
      const res = await articlesApi.listUpdateSchedules(slug);
      setScheduledUpdates([...res.data.schedules]);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleScheduleUpdateSubmit = async () => {
    try {
      const d = new Date(`${date} ${time}`);
      if (d < new Date()) {
        Toastr.error("Select a future date and time");
        return;
      }
      await articlesApi.createUpdateSchedule({
        slug: article.slug,
        payload: {
          status: scheduleUpdateState,
          execution_time: d.getTime() / 1000,
        },
      });
      setIsPaneOpen(false);
      fetchUpdateSchedules();
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <>
      <div className="mt-16 flex h-full w-full">
        <RestoreModal
          showRestoreModal={showRestoreModal}
          setShowRestoreModal={setShowRestoreModal}
          selectedVersion={selectedVersion}
          handleSubmit={handleSubmit}
        />
        <Navbar state={article?.state} slug={article?.slug} />
        <div className="w-9/12">
          <Form
            editPage
            loading={loading}
            title={title}
            body={body}
            category={category}
            state={article?.state}
            slug={article?.slug}
            setTitle={setTitle}
            setBody={setBody}
            setCategory={setCategory}
            categories={categories}
            handleSubmit={handleSubmit}
            handleClose={() => history.push("/articles")}
            setIsPaneOpen={setIsPaneOpen}
          />
        </div>
        <div className="edit-article-sidebar-container w-3/12 border-l-2">
          <div className="version-history-container overflow-auto">
            <VersionHistory
              setShowRestoreModal={setShowRestoreModal}
              versions={versions}
              setSelectedVersion={setSelectedVersion}
            />
          </div>
          <div className="pending-updates-container overflow-auto border-t-2">
            <ScheduledUpdates scheduledUpdates={scheduledUpdates} />
          </div>
        </div>
      </div>
      <NewScheduleUpdateForm
        isPaneOpen={isPaneOpen}
        setIsPaneOpen={setIsPaneOpen}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        scheduleUpdateState={scheduleUpdateState}
        setScheduleUpdateState={setScheduleUpdateState}
        handleScheduleUpdateSubmit={handleScheduleUpdateSubmit}
      />
    </>
  );
}

export default EditArticle;
