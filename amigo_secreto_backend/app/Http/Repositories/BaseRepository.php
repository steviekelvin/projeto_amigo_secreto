<?php

namespace App\Http\Repositories;

abstract class BaseRepository
{
    protected static string $model;

    public static function all()
    {
        return self::loadModel(static::$model)::all();
    }

    public static function find($id)
    {
        return self::loadModel(static::$model)::find($id);
    }

    public static function create(array $data): object
    {
        return self::loadModel(static::$model)::create($data);
    }

    public static function update($id, array $data): bool
    {
        $modelInstance = self::loadModel(static::$model)::find($id);
        return $modelInstance ? $modelInstance->update($data) : false;
    }

    public static function delete($id): bool
    {
        $modelInstance = self::loadModel(static::$model)::find($id);
        return $modelInstance ? $modelInstance->delete() : false;
    }

    protected static function loadModel(string $model)
    {
        return app($model);
    }
}
