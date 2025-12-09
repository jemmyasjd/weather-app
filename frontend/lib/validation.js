import * as Yup from 'yup';

export const weatherSchema = Yup.object().shape({
  latitude: Yup.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .required('Latitude is required'),
  longitude: Yup.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
    .required('Longitude is required'),
  start_date: Yup.date()
    .required('Start date is required')
    .max(Yup.ref('end_date'), 'Start date must be before end date'),
  end_date: Yup.date()
    .required('End date is required')
    .min(Yup.ref('start_date'), 'End date must be after start date')
    .test(
      'max-31-days',
      'Date range cannot exceed 31 days',
      function (endDate) {
        const { start_date } = this.parent;
        if (!start_date || !endDate) return true;

        const start = new Date(start_date);
        const end = new Date(endDate);

        const diffTime = end.getTime() - start.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        return diffDays <= 31;
      }
    ),
});
