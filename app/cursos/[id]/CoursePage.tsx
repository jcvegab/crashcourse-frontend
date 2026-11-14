'use client';

import Header from '@/layouts/Header';

import Button from '@/ui/Button';
import CourseDetail from '@/ui/CourseDetail';
import CourseStats from '@/ui/CourseStats';
import CourseTrailer from '@/ui/CourseTrailer';
import Price from '@/ui/Price';

import type { Course } from '@/types/course.types';

type CoursePageProps = {
  course: Course;
};

export default function CoursePage({ course }: CoursePageProps) {
  return (
    <>
      <Header />
      <main>
        <CourseDetail.Root>
          <CourseDetail.Media>
            <CourseTrailer />
          </CourseDetail.Media>
          <CourseDetail.Overview>
            <CourseDetail.Heading>{course.name}</CourseDetail.Heading>
            <CourseDetail.MobilePrice>
              <Price
                amount={course.price}
                compareAtAmount={course.realPrice}
                size="compact"
              />
            </CourseDetail.MobilePrice>
            <CourseDetail.Summary>
              Body 3- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Id mi, mauris aliquam phasellus quis semper diam fringilla. Nunc
              nullam est in non. Enim sapien amet ut pharetra. Purus sagittis
              est felis sapien in. Auctor tellus, in mauris mi, facilisi arcu
              sedut.
            </CourseDetail.Summary>
            <CourseDetail.Stats>
              <CourseStats
                level={course.level}
                users={course.users}
                course_score={course.score}
              />
            </CourseDetail.Stats>
            <CourseDetail.Instructor>
              <CourseDetail.InstructorAvatar aria-hidden="true" />
              <CourseDetail.InstructorInfo>
                <CourseDetail.InstructorName>
                  Subtitle 3 - Nombre profesor
                </CourseDetail.InstructorName>
                <CourseDetail.InstructorRole>
                  Body 3 - Cargo profesor
                </CourseDetail.InstructorRole>
              </CourseDetail.InstructorInfo>
            </CourseDetail.Instructor>
          </CourseDetail.Overview>
          <CourseDetail.Purchase>
            <CourseDetail.Price>
              <Price
                amount={course.price}
                compareAtAmount={course.realPrice}
                size="large"
              />
            </CourseDetail.Price>
            <CourseDetail.Actions>
              <Button href="/checkout" fullWidth>
                Comprar ahora
              </Button>
              <Button variant="secondary" fullWidth disabled>
                Agregar a carrito
              </Button>
            </CourseDetail.Actions>
          </CourseDetail.Purchase>
        </CourseDetail.Root>
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
        </div>
      </main>
    </>
  );
}
