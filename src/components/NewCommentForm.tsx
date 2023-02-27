import classNames from 'classnames';
import React, { FormEvent, useEffect, useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  handleOnAdd: (newComment: CommentData) => void,
  isLoadingNewComment: boolean,
  // isNameError: boolean,
  // isEmailError: boolean,
  // isBodyError: boolean,
  skipAllErrors: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  handleOnAdd,
  isLoadingNewComment,
  // isNameError,
  // isEmailError,
  // isBodyError,
  skipAllErrors,
}) => {
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [isBodyError, setIsBodyError] = useState(false);

  const handleReset = () => {
    setIsBodyError(false);
    setIsEmailError(false);
    setIsNameError(false);
    setName('');
    setEmail('');
    setBody('');
  };

  useEffect(() => {
    handleReset();
  }, [skipAllErrors]);

  const handleAdd = (event: FormEvent) => {
    event.preventDefault();

    const isNameEmpty = name.length === 0;
    const isEmailEmpty = email.length === 0;
    const isBodyEmpty = body.length === 0;

    setIsNameError(isNameEmpty);
    setIsEmailError(isEmailEmpty);
    setIsBodyError(isBodyEmpty);

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      return;
    }

    const newComment: CommentData = {
      name,
      email,
      body,
    };

    handleOnAdd(newComment);
    setBody('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(e) => handleAdd(e)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': isNameError,
            })}
            value={name}
            onChange={({ target }) => {
              setName(target.value);
              setIsNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {isNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}

      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
              setIsEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': isBodyError,
            })}
            value={body}
            onChange={({ target }) => {
              setBody(target.value);
              setIsBodyError(false);
            }}
          />
        </div>

        {isBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoadingNewComment,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
