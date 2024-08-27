<?php

namespace App\Http\Repositories;

use App\Models\Person;
use Illuminate\Support\Facades\DB;

class PersonRepository extends BaseRepository
{
    protected static string $model = Person::class;

    public function chooseRandomly()
    {
        $participants = self::all();

        if ($participants->isEmpty()) {
            return [
                'success' => false,
                'message' => 'Participantes não registrados',
                'status' => 400
            ];
        }

        $countParticipants = $participants->count();

        if ($countParticipants < 3) {
            return [
                'success' => false,
                'message' => 'O número mínimo de participantes é 3',
                'status' => 400
            ];
        }

        $pairs = [];

        $available = $participants->toArray();

        DB::beginTransaction();
        try {
            foreach ($participants as $giver) {
                $options = array_filter($available, function ($participant) use ($giver) {
                    return $participant['id'] !== $giver->id;
                });

                if (count($options) == 1 && reset($options)['id'] == $giver->id) {
                    return $this->chooseRandomly();
                }

                $receiverKey = array_rand($options);
                $receiver = $options[$receiverKey];

                $giver->secret_friend = $receiver['id'];
                $giver->save();

                $pairs[] = [
                    'person' => $giver->name,
                    'receiver' => $receiver['name'],
                ];

                unset($available[$receiverKey]);
            }

            DB::commit();
            return [
                'success' => true,
                'message' => 'Sorteio realizado com sucesso',
                'data' => $pairs,
                'status' => 200
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'success' => false,
                'message' => 'Erro ao realizar o sorteio',
                'status' => 500
            ];
        }
    }

    public function getChosenList()
    {
        $participants = self::all();

        if ($participants->isEmpty()) {
            return [
                'success' => false,
                'message' => 'Participantes não registrados',
                'status' => 400
            ];
        }

        $chosenList = [];

        foreach ($participants as $participant) {
            $chosen = self::find($participant->secret_friend);
            $chosenList[] = [
                'person' => $participant,
                'chosen' => $chosen
            ];
        }

        return [
            'success' => true,
            'data' => $chosenList,
            'status' => 200
        ];
    }

    public function clearSecretFriends()
    {
        $participants = self::all();

        if ($participants->isEmpty()) {
            return [
                'success' => false,
                'message' => 'Participantes não registrados',
                'status' => 400
            ];
        }

        DB::beginTransaction();
        try {
            foreach ($participants as $participant) {
                $participant->secret_friend = null;
                $participant->save();
            }

            DB::commit();
            return [
                'success' => true,
                'message' => 'Amigos secretos removidos com sucesso',
                'status' => 200
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'success' => false,
                'message' => 'Erro ao remover amigos secretos',
                'status' => 500
            ];
        }
    }

    public function validEmailExists(string $email, int $id): bool
    {
        return Person::where('email', $email)
                     ->where('id', '!=', $id)
                     ->exists();
    }
}
