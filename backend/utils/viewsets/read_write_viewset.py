from rest_framework import status
from rest_framework.response import Response


class ReadWriteViewset:
    write_serializer_class = None
    read_serializer_class = None

    def create(self, request, *args, **kwargs):
        serializer = self.write_serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        write_serializer = self.write_serializer_class(
            instance=instance,
            data=request.data,
            partial=partial,
        )

        write_serializer.is_valid(raise_exception=True)
        self.perform_update(write_serializer)

        read_serializer = self.read_serializer_class(instance)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(read_serializer.data)
