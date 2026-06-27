'use client';

import Header from '@/layouts/Header';

import CoursePreview from '@/ui/CoursePreview';
import CourseStats from '@/ui/CourseStats';
import { StyledH2 } from '@/ui/Title';

import type { Course } from '@/types/course.types';

type CoursePageProps = {
  course: Course;
};

export default function CoursePage({ course }: CoursePageProps) {
  return (
    <>
      <Header />
      <main>
        <div>
          <StyledH2>{course.name}</StyledH2>
          <p>
            Body 3- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
            mi, mauris aliquam phasellus quis semper diam fringilla. Nunc nullam
            est in non. Enim sapien amet ut pharetra. Purus sagittis est felis
            sapien in. Auctor tellus, in mauris mi, facilisi arcu sedut.
          </p>
          <CourseStats
            level={course.level}
            users={course.users}
            course_score={course.score}
          />
        </div>
        <div>
          <div>Img</div>
          <p>Subtitle 3 - Nombre profesor</p>
          <p>Body 3 - Cargo profesor</p>
        </div>
        <div>
          <div>
            <span>Acción 1</span>
          </div>
          <div>
            <span>Acción 1</span>
          </div>
          <div>
            <span>Acción 1</span>
          </div>
          <CoursePreview props={course} />
        </div>
      </main>
    </>
  );
}
